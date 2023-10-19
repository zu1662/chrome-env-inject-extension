import ReactDOM from 'react-dom';

import { App } from './app';

const rootEl = document.createElement('div');
rootEl.setAttribute('id', 'app')
document.body.appendChild(rootEl);

ReactDOM.render(<App />, rootEl);
