type LogType = 'primary' | 'success' | 'warning' | 'danger' | 'normal';
let normal = '#35495E',
  primary = '#3488ff',
  success = '#43B883',
  warning = '#e6a23c',
  danger = '#f56c6c';

/**
 * @description 返回这个样式的颜色值
 * @param {String} type 样式名称 [ primary | success | warning | danger | text ]
 */
export const typeColor = (type: LogType = 'normal') => {
  let color = '';
  switch (type) {
    case 'normal':
      color = normal;
      break;
    case 'primary':
      color = primary;
      break;
    case 'success':
      color = success;
      break;
    case 'warning':
      color = warning;
      break;
    case 'danger':
      color = danger;
      break;
    default:
      break;
  }
  return color;
};

/**
 * @description 打印彩色文字
 */
export const colorful = (textArr: { type?: LogType; text: string }[]) => {
  // eslint-disable-next-line no-console
  console.log(
    `%c${textArr.map((t) => t.text || '').join('%c')}`,
    ...textArr.map((t) => `color: ${typeColor(t.type)};`)
  );
};

/**
 * @description 打印一个 [ title | text ] 样式的信息
 * @param {String} title title text
 * @param {String} info info text
 * @param {String} type style
 */
export const capsule = (title: string, info: string | number, type: LogType = 'primary') => {
  // eslint-disable-next-line no-console
  console.log(
    `%c ${title} %c ${info} %c`,
    'background:#35495E; padding: 1px; border-radius: 3px 0 0 3px; color: #fff;',
    `background:${typeColor(type)}; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff;`,
    'background:transparent'
  );
};

// _ is a hack. it will be wrong without _.
/**
 * @description 打印 default 样式的文字
 */
export const _default = (text: string) => {
  colorful([{ text }]);
};

/**
 * @description 打印 primary 样式的文字
 */
export const _primary = (text: string) => {
  colorful([{ text, type: 'primary' }]);
};

/**
 * @description 打印 success 样式的文字
 */
export const _success = (text: string) => {
  colorful([{ text, type: 'success' }]);
};

/**
 * @description 打印 warning 样式的文字
 */
export const _warning = (text: string) => {
  colorful([{ text, type: 'warning' }]);
};

/**
 * @description 打印 danger 样式的文字
 */
export const _danger = (text: string) => {
  colorful([{ text, type: 'danger' }]);
};
