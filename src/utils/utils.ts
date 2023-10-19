export function safeJsonParse(value) {
  try {
    if (!value) return {};

    if (typeof value === 'object') {
      return value;
    }

    if (typeof value === 'string') {
      return JSON.parse(value as string);
    }

    return {};
  } catch (e) {
    return {};
  }
}

export function shortId() {
  let str = '';
  for (let i = 0; i < 6; i++) {
    str += String(Math.floor(Math.random() * 10));
  }

  return str;
}

// 把 js 对象转换为 code 格式
const objectToString = (data, indentation = 0) => {
  const arrayType = '[object Array]';
  const strigType = '[object String]';
  const objectType = '[object Object]';
  const dataType = Object.prototype.toString.call(data);
  const dataIsArray = dataType == arrayType;
  const dataIsObject = dataType == objectType;
  let resStr = '';
  let nextIndentationStr = '\t'.repeat(indentation);
  let indentationStr = '\t'.repeat(indentation - 1);
  for (const key in data) {
    let value = data[key];
    const valueType = Object.prototype.toString.call(value);
    switch (valueType) {
      case strigType:
        value = '`' + value + '`';
        break;
      case objectType:
        value = `{\n${nextIndentationStr + '\t'}${objectToString(value, indentation + 1)}}`;
        break;
      case arrayType:
        value = `[\n${nextIndentationStr + '\t'}${objectToString(value, indentation + 1)}]`;
        break;
    }

    if (dataIsArray) {
      if (Number(key) == data.length - 1) {
        resStr += `${value},\n${indentationStr}`;
      } else {
        resStr += `${value},\n${nextIndentationStr}`;
      }
    } else {
      resStr += `${key}: ${value},\n${nextIndentationStr}`;
    }
  }

  if ((dataIsArray && data.length == 0) || (dataIsObject && Object.keys(data).length == 0)) {
    resStr += `\n${indentationStr}`;
  }

  return resStr;
};

// 适配 js 格式，添加一层包裹
export function serializer(data) {
  return `const config = {
\t\/\/ 以下为配置数据
\t${objectToString(data, 1)}
}
  `;
}

// eval 执行是的包裹层
export function wrapFunc(code) {
  return `
    function getConfig(){
      ${code}
      return config
    }
    getConfig()
  `;
}
