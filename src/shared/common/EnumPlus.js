// 模拟枚举类
export default class EnumPlus {
  constructor(options) {
    options.forEach(option => {
      if (typeof option === 'string') {
        this[option] = option;
      } else {
        const [key, value] = option;
        this[key] = value;
      }
    });
  }
}
