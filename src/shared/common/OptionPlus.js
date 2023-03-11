// 一个扩展类，用于规范选项或枚举值的数据结构。
export default class OptionPlus {
  constructor(value, label, key) {
    this.value = value;
    this.label = label || value;
    this.key = key || value;
  }
  // 用于对比一下两个对象的值，作用类似 `@/shared/utils/options.js` 中的 `equalsOption`
  equals({ value, label }) {
    // 对比一下 value 和 label 就足够
    return value === this.value && label === this.label;
  }
  // 就简单对比下 value
  equalValue(value) {
    return value === this.value;
  }
}
