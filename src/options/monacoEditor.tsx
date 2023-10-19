/*
 * @Date         : 2022-07-25 22:55:28
 * @LastEditors  : zu1662
 * @LastEditTime : 2023-10-18 16:19:28
 * @Description  : JSON 编辑器
 * 
 * Copyright © 2022 by zu1662, All Rights Reserved. 
 */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Editor, { loader } from '@monaco-editor/react';
import { editor} from 'monaco-editor';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import { Banner, Spin, Toast } from '@douyinfe/semi-ui';
import { serializer, wrapFunc } from '@/utils/utils';

loader.config({ monaco })

const DEFAULT_STYLE = {
  height: '100%',
  overflow: 'hidden',
  border: '1px solid var(--border-color)',
  marginBottom: 24,
};

const MonacoEditorOptions = {
  language: 'javascript',
  automaticLayout: true,
  theme: 'vs-dark',
  scrollBeyondLastLine: false,
  scrollbar: {
    useShadows: false,
    vertical: 'visible',
    horizontal: 'visible',
    verticalScrollbarSize: 6,
    horizontalScrollbarSize: 6,
  },
} as any;

export interface EditorProps {
  value: Record<string, any> | undefined,
  onChange?: (data: Record<string, any>) => void
  onSave?: (data:Record<string, any>) => void
  style?: React.StyleHTMLAttributes<any>
}

// 发送 eval 消息到 iframe
function sandboxEval(expression) {
  const iframe = document.getElementById('theFrame') as HTMLIFrameElement
  const message = {
      cmd: 'eval',
      value: expression
  };
  iframe?.contentWindow?.postMessage(message, '*')
}

export const MonacoEditor:React.FC<EditorProps> = ({ value, onChange, onSave, style = DEFAULT_STYLE }) => {
  const container = useRef(null);
  const editorRef = useRef<editor.IStandaloneCodeEditor>();
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState(null);
  const [editorTheme, setEditorTheme] = useState('vs')

  useEffect(() => {
    if (!mounted) {
      return;
    }
    if (!value) return;
    editorRef.current?.setValue(serializer(value));
  }, [mounted, value]);

  useEffect(() => {
    // 接收消息
    window.addEventListener('message', function(event){
      const message = event.data
      if (message) {
        switch (message.cmd) {
          // 接收来自 iframe 的 eval 结果
          case 'eval':
            if (message.error) {
              Toast.error(message.error)
            } else {
              if(!message.value.hasOwnProperty('id')) {
                Toast.error({
                  content: '需要唯一Id'
                })
                return
              }
              if(!message.value.hasOwnProperty('title')) {
                Toast.error({
                  content: '需要配置title属性'
                })
                return
              }
              onSave && onSave(message.value)
            }
          break
        }
      }
    })
  }, [])

  const editorSave = () => {
    const data = editorRef.current?.getValue()
    try {
      sandboxEval(wrapFunc(data))
    } catch (err) {
      console.error(err);
    }
  }

  const onMount = useCallback((editorIns: editor.IStandaloneCodeEditor) => {
    editorRef.current = editorIns;
    editorIns.addAction({
      id: "save",
      label: "save",
      keybindings: [
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS
      ],
      run: editorSave
    })
    setMounted(true);
  }, []);

  const handleChange = useCallback(
    (text) => {
      if (!text) return;
      try {
        // const json = safeJsonParse(text);

        // if (typeof json === 'object') {
        //   if (!deepEqual(json, value)) {
        //     onChange && onChange(json);
        //   }
        // }
      } catch (e) {
        setError(e as any);
      }
    },
    [value, onChange]
  );

  return (
    <>
      <div ref={container} style={style}>
        <Editor
          height="100%"
          defaultValue="{}"
          language="javascript"
          theme={editorTheme}
          options={MonacoEditorOptions}
          loading={<Spin style={{height: '100%', width: '100%'}} tip="编辑器努力加载中..." spinning={true}></Spin>}
          onMount={onMount}
          onChange={handleChange}
        />
      </div>
      {error ? (
        <Banner style={{ marginBottom: 24 }} description="Json 格式化出错，请继续编辑" type="danger" />
      ) : null}
    </>
  );
};

