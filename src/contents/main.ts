import { capsule } from '@/utils/logger';

capsule('ContentScript', 'Injected');

// 接收来自后台的消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.cmd == 'inject_script_src') {
    addScriptSrc(request.value);
  } else if (request.cmd == 'inject_script_code') {
    addScriptCode(request.value);
  }

  sendResponse('我收到你的消息了：' + request);
  return true;
});

function removeOriginScript(script: string) {
  const originScript = document.querySelector(
    'script[src*="js.40017.cn/touch/hb/c/bridge.4.3.2.js"]'
  ) as HTMLScriptElement;
  console.log(1111, originScript);
  originScript.addEventListener('load', () => {
    console.log(222);
  });
}

function addScriptSrc(s) {
  const tempS = document.createElement('script');
  tempS.setAttribute('type', 'text/javascript');
  tempS.src = s;
  document.body.appendChild(tempS);
  // tempS.onload = function(){
  //   // 放在页面不好看，执行完后移除掉
  //   this.parentNode.removeChild(this);
  // };
}

function addScriptCode(sCode) {
  const tempS = document.createElement('script');
  tempS.textContent = sCode;
  (document.head || document.documentElement).appendChild(tempS);
  tempS.onload = function () {
    // 放在页面不好看，执行完后移除掉
    // this.parentNode.removeChild(this);
  };
}
