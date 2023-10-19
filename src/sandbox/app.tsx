import { useEffect } from "react";

export const App = () => {

  useEffect(() => {
    window.addEventListener('message', (e) => {
      let result = ''
      const cmd = e.data.cmd;
      const value = e.data.value
      switch (cmd) {
        // 根据所收到消息的 command 值决定执行流程
        case 'eval':
          try {
            result = eval(value)
          } catch (error) {
            window.parent.postMessage({ cmd, error }, '*')
            return;
          }
          break
      }
      // 传回消息给消息发起方
      window.parent.postMessage({ cmd, value: result }, '*')
    }, false)
  })
  return (
    <div className="sandbox-page">
      沙盒环境
    </div>
  );
};
