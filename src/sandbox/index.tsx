import ReactDOM from 'react-dom';

import { App } from './app';

const rootEl = document.createElement('div');
document.body.appendChild(rootEl);

ReactDOM.render(<App />, rootEl);

// @ts-ignore
window.evalScript = (code: string) => {
  return eval(code)
}

