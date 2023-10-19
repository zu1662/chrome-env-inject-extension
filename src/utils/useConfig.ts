export interface InjectType {
  id: string;
  title: string;
  url?: string;
  color?: string;
  cookies?: string[];
  scripts?: string[];
}

export interface PromiseType {
  config: InjectType[];
  activeId: string;
  activeConfig: InjectType | undefined;
  changeConfig: (cnf: InjectType[]) => void;
  changeActiveId: (id: string) => void;
}

const CONFIG_KEY = 'envConfig';
const ACTIVE_KEY = 'envActive';

let config: InjectType[] = [];
let activeId: string = '';
let activeConfig: InjectType | undefined;

const changeConfig = (cnf: InjectType[]) => {
  config = cnf;
  chrome.storage.sync.set({
    [CONFIG_KEY]: config
  });

  updateCurConfig();
};

const changeActiveId = (id: string) => {
  activeId = id;

  chrome.storage.sync.set({
    [ACTIVE_KEY]: id
  });

  updateCurConfig();
};

const updateCurConfig = () => {
  // 当前激活配置
  activeConfig = config?.find(v => v.id == activeId);
};

changeConfig(config);
changeActiveId(activeId);

export const useConfig = () => {
  return new Promise<PromiseType>(resolve => {
    chrome.storage.sync.get([CONFIG_KEY, ACTIVE_KEY], data => {
      // 基础数据(保存在本地)
      config = data[CONFIG_KEY] as InjectType[];
      activeId = data[ACTIVE_KEY] as string;

      updateCurConfig();

      resolve({
        config,
        changeConfig,
        activeId,
        changeActiveId,
        activeConfig
      });
    });
  });
};
