/*
 * @Author: your name
 * @Date: 2020-03-27 09:15:45
 * @LastEditTime: 2022-03-08 21:34:21
 * @LastEditors: zulezhe
 * @Description: In User Settings Edit
 * @FilePath: \weidun\postcss.config.js
 */
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 1920, // 视窗的宽度，对应pc设计稿的宽度，一般是1920
      viewportHeight: 1080, // 视窗的高度，对应的是我们设计稿的高度
      unitPrecision: 3, // 单位转换后保留的精度,保留几位小数点
      propList: ['*'],
      viewportUnit: 'vw', // 希望使用的视口单位
      fontViewportUnit: 'vw', // 字体使用的视口单位
      selectorBlackList: ['el-icon-more'], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
      minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
      mediaQuery: false, // 媒体查询里的单位是否需要转换单位
      replace: true // 是否直接更换属性值，而不添加备用属性
      // exclude: /(\/|\\)(node_modules)(\/|\\)/ // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
    },
    'postcss-viewport-units': {
      filterRule: rule => !rule.selector.includes('::after') && !rule.selector.includes('::before') && !rule.selector.includes(':after') && !rule.selector.includes(':before')
    }
  }
};
