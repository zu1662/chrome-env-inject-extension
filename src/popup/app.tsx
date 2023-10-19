import { Divider, Empty, Typography } from '@douyinfe/semi-ui';
import { IconGlobe, IconSetting } from '@douyinfe/semi-icons'
import { useConfig } from '@/hooks/useConfig';
import cls from 'classnames'

import './app.less'

export const App = () => {

  const { config, activeId, changeActiveId } = useConfig()

  const handleChangeId = (id: string) => {
    changeActiveId(id)

    chrome.browserAction.setIcon({ path: '/images/' + (id ? 'logo-active.png' : 'logo.png')})
    
    // chrome.tabs.query({active: true, currentWindow: true}, ([tab]) => {
    //   tab.id && chrome.tabs.reload(tab.id);
		// });
  }

  return (
    <div className="popup-page">
      { config?.length ? (
         <div className='config-box'>
          <div className={cls('config-item config-list', !activeId  && 'active')} onClick={() => handleChangeId('')}>
            <IconGlobe />
            <span>取消注入</span>
          </div>
          <Divider margin='5px'/>
         { config.map(c => (
           <div key={c.id} className={cls('config-item config-list', c.id == activeId && 'active')} onClick={() => handleChangeId(c.id)}>
              <IconGlobe style={{ color: c.color}} />
              <span>{c.title}</span>
           </div>
         ))}
         <Divider margin='5px'/>
          <a href="./options.html" target="_blank" className='config-item config-setting'>
            <IconSetting />
            <span>配置管理</span>
          </a>
       </div>
      ) : (
        <Empty
          title="暂未发现配置项"
          description={
            <span className='empty-extra'>
              <Typography.Text>试试 </Typography.Text>
              <Typography.Text link><a href="./options.html?type=adding" target="_blank">新建配置项</a></Typography.Text>
            </span>
          }
        />
      )}
    </div>
  );
};
