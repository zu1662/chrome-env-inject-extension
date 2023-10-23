import { ACTIVE_KEY, CONFIG_KEY } from '@/utils/const';
import { useEffect, useState } from 'react';

export const useConfig = () => {
  const [config, setConfig] = useState<InjectType[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [activeConfig, setActiveConfig] = useState<InjectType>();

  const updateCurConfig = () => {
    // 当前激活配置
    const cur = config?.find(v => v.id == activeId);
    setActiveConfig(cur);
  };

  useEffect(() => {
    chrome.storage.sync.get([CONFIG_KEY, ACTIVE_KEY], data => {
      // 基础数据(保存在本地)
      const envConfigs = data[CONFIG_KEY] as InjectType[];
      const envActive = data[ACTIVE_KEY] as string;
      envConfigs && setConfig(envConfigs);
      envActive && setActiveId(envActive);
    });
  }, []);

  useEffect(() => {
    updateCurConfig()
  }, [activeId, config])

  const changeConfig = (config: InjectType[]) => {
    setConfig(config);
    chrome.storage.sync.set({
      [CONFIG_KEY]: config
    });
  };

  const changeActiveId = (id: string) => {
    setActiveId(id);
    chrome.storage.sync.set({
      [ACTIVE_KEY]: id
    });
  };


  return {
    config,
    changeConfig,
    activeId,
    changeActiveId,
    activeConfig
  };
};
