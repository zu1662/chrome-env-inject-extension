import { capsule } from '@/utils/logger';
import { ACTIVE_KEY, CONFIG_KEY, FIRST_INIT } from '@/utils/const';
import { baseConfig } from '@/utils/base';

chrome.runtime.onInstalled.addListener(() => {
  capsule('Env Extension', 'Injected');
  chrome.storage.sync.get([FIRST_INIT], data => {
    const firstInit = data[FIRST_INIT] as number;

    if (!firstInit) {
      chrome.storage.sync.set({
        [CONFIG_KEY]: baseConfig,
        [FIRST_INIT]: 1
      });
    }
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  chrome.storage.sync.get([CONFIG_KEY, ACTIVE_KEY], data => {
    const config = data[CONFIG_KEY] as InjectType[];
    const activeId = data[ACTIVE_KEY] as string;
    const activeConfig = config?.find(v => v.id == activeId);

    // tab加载初期就执行
    if (changeInfo.status !== 'complete') return;

    const { url = '', scripts } = activeConfig || {};
    const reg = new RegExp(url);
    // 匹配的 URL 进行数据注入
    if (reg.test(tab.url || '')) {
      // Cookie 在请求内注入，此处注释
      // if (cookies && cookies.length > 0) {
      //   injectCookies(cookies, tabId, tab.url);
      // }

      if (scripts && scripts.length > 0) {
        injectScripts(scripts, tabId, tab.url);
      }
    }
  });
});

chrome.webRequest.onBeforeSendHeaders.addListener(
  function (details) {
    chrome.storage.sync.get([CONFIG_KEY, ACTIVE_KEY], data => {
      const config = data[CONFIG_KEY] as InjectType[];
      const activeId = data[ACTIVE_KEY] as string;
      const activeConfig = config?.find(v => v.id == activeId);

      const urlReg = new RegExp(activeConfig?.url || '');

      const havedCookie = details.requestHeaders?.find(v => v.name == 'Cookie')?.value;
      const isHave = activeConfig?.cookies?.every(v => {
        const key = v.match(/(\w+)=(.*);?/);
        return key && havedCookie?.includes(key[1]);
      });

      if (!isHave && urlReg.test(details.url)) {
        injectCookies(activeConfig?.cookies, null, details.url);

        // 需要注入的 cookieStr
        const cookieStr = activeConfig?.cookies?.reduce((pre, cur) => {
          let curStr = cur + (cur.endsWith(';') ? ' ' : '; ');
          return pre + curStr;
        });
        details.requestHeaders?.push({
          name: 'Cookie',
          value: cookieStr
        });
      }
    });
    return { requestHeaders: details.requestHeaders };
  },
  { urls: ['<all_urls>'] },
  ['blocking', 'requestHeaders', 'extraHeaders']
);

// 设置下消息接收，防止报错
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  console.log(sender.url, msg);
});

// js的注入
async function injectScripts(scripts, tabId, tabUrl) {
  scripts.forEach(s => {
    const urlReg = /http(s?):\/\//;
    // 表明script是一个url链接
    if (urlReg.test(s)) {
      sendMessageToContentScript({ cmd: 'inject_script_src', value: s });
    } else {
      try {
        sendMessageToContentScript({ cmd: 'inject_script_code', value: s });
      } catch (error) {
        console.log(error);
      }
    }
  });
}

// cookies的注入
function injectCookies(cookies, tabId, tabUrl) {
  const urlInfo = getLocation(tabUrl);
  // 基础数据
  let d = new Date();
  let expired = 365 * 70; // 70years
  let e = d.setTime(d.getTime() / 1000 + expired * 24 * 3600); //second
  let domain = urlInfo.domain;
  let url = urlInfo.protocol + '//' + domain;

  // cookie拆分赋值
  for (let ci in cookies) {
    const cc = cookies[ci].split(';');
    for (let i in cc) {
      let c = cc[i].replace(/^\s+|\s+$/g, '');
      if (!c) continue;
      const regRes = /(\w+)=(.*);?/.exec(c);
      if (regRes) {
        chrome.cookies.set({
          url: url,
          name: regRes[1],
          value: regRes[2],
          path: '/',
          domain: domain,
          expirationDate: e
        });
      }
    }
  }
}

function getLocation(href) {
  const match = href.match(/^(https?:)\/\/(([^:/?#]*)(?::([0-9]+))?)(\/[^?#]*)(\?[^#]*|)(#.*|)$/);
  const domainMatch = match[2].match(/\.([^.]+\.[^.]+)$/);
  return (
    match && {
      url: href,
      protocol: match[1],
      host: match[2],
      domain: domainMatch && domainMatch[1],
      hostname: match[3],
      port: match[4],
      pathname: match[5],
      search: match[6],
      hash: match[7]
    }
  );
}

function getCurrentTabId() {
  return new Promise<number | undefined>((resolve, reject) => {
    let queryOptions = { active: true, currentWindow: true, lastFocusedWindow: true };
    chrome.tabs.query(queryOptions, ([tab]) => {
      if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
      tab && resolve(tab.id);
    });
  });
}

function sendMessageToContentScript(message) {
  return new Promise(resolve => {
    getCurrentTabId().then(tabId => {
      tabId &&
        chrome.tabs.sendMessage(tabId, message, function (response) {
          resolve(response);
        });
    });
  });
}
