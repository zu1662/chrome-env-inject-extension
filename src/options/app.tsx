import { useConfig } from '@/hooks/useConfig';
import { Button, Form, Layout, Nav } from '@douyinfe/semi-ui';
import { IconHistogram, IconSemiLogo, IconSetting, IconPlusCircle } from '@douyinfe/semi-icons';
import { MonacoEditor } from './monacoEditor';

const { Sider, Content } = Layout;

import './app.less';
import { useCallback, useEffect, useState } from 'react';
import { shortId } from '@/utils/utils';
import { randomColor } from '@/utils/colors';

export const App = () => {
  const { activeId = '', config, activeConfig, changeConfig } = useConfig();
  const [curActive, setCurActive] = useState(activeId)
  const [curConfig, setCurConfig] = useState(activeConfig)
  const [showType, setShowType] = useState<'configs' | 'setting' | 'adding'>('configs')
  const [addConfig, setAddConfig] = useState({
    id: "",
    color: "",
    title: "",
    cookies: [],
    scripts: []
  })

  useEffect(() => {
    setCurActive(activeId)
    setCurConfig(config?.find(c => c.id == activeId))
  }, [activeId])

  const subItems = config?.map(c => ({ itemKey: c.id, text: c.title }));

  const handleNavSelect = select => {
    const type = select.itemKey != 'setting' ? 'configs' : 'setting'
    setShowType(type)
    const curId = select.itemKey != 'setting' ? select.itemKey : ''
    setCurActive(curId)
    setCurConfig(config?.find(c => c.id == curId))
  };

  const handleSubmitSetting = values => {
    console.log(values);
  };

  const handleEditorSave = useCallback((curConfig) => {
    console.log('----->>>', showType, config);
    
    let newConfig: any = []
    if(showType == 'configs') {
      newConfig = config?.map(c => {
        if(c.id == curConfig.id) {
          return curConfig
        }
        return c
      })
    } else if (showType == 'adding') {
      newConfig = config?.concat(curConfig)
    }

    changeConfig(newConfig)
  }, [showType, config])

  const handleAddConfig = () => {
    const initConfig = {
      id: "",
      color: "",
      title: "",
      cookies: [],
      scripts: []
    }
    initConfig.id = shortId()
    initConfig.color = randomColor()
    setAddConfig(initConfig)
    setCurActive('')
    setShowType('adding')
  }

  useEffect(() => {
    const queryType = window.location.search.replace('?type=', '')
    if(queryType == 'adding') {
      handleAddConfig()
    }
  }, [])

  return (
    <Layout className="options-page" style={{ border: '1px solid var(--semi-color-border)', height: '100%' }}>
      <Sider style={{ backgroundColor: 'var(--semi-color-bg-1)', height: '100%' }}>
        <Nav
          onSelect={handleNavSelect}
          defaultSelectedKeys={[curActive]}
          openKeys={['configs']}
          style={{ maxWidth: 220, height: '100%' }}
          items={[
            { itemKey: 'setting', text: '插件配置', icon: <IconSetting size="large" /> },
            { itemKey: 'configs', text: '配置项', icon: <IconHistogram size="large" />, items: subItems }
          ]}
          header={{
            logo: <IconSemiLogo style={{ fontSize: 36 }} />,
            text: '插件配置页面'
          }}
          footer={{
            children: <Button theme='solid' type='primary' style={{ width: '100%'}} icon={<IconPlusCircle />} onClick={handleAddConfig}>新增配置</Button>
          }}
        />
      </Sider>
      <Content>
        {showType == 'setting' && (
          <Form labelPosition="left" onSubmit={values => handleSubmitSetting(values)} style={{ padding: '20px' }}>
          {({ formState, values, formApi }) => (
            <>
              <Form.Switch field="switch" label="切换配置自动重载页面" />
            </>
          )}
        </Form>
        )}
        {(showType == 'configs' || showType == 'adding') && (
          <div className='config-editor'>
            <MonacoEditor value={showType == 'configs' ? curConfig : addConfig} onSave={handleEditorSave} />
          </div>
        )}
      </Content>
    </Layout>
  );
};
