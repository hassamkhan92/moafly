/*
 * @Author: wangchaoxu
 * @Date: 2020-07-15 18:56:51
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-09-01 21:39:40
 * @Description:
 */
import Vue from 'vue';
Vue.directive('drag', function(el) {
  el.style.position = 'absolute';
  el.style.zIndex = '9';
  el.style.cursor = 'move';
  el.onmousedown = function(ev) {
    const mx = ev.clientX; // 鼠标距离浏览器窗口左侧
    const my = ev.clientY; // 鼠标距离浏览器窗口上侧
    const ex = el.offsetLeft; // 元素距离浏览器窗口左侧
    const ey = el.offsetTop; // 元素距离上侧
    const ew = el.offsetWidth; // 元素宽度
    const eh = el.offsetHeight; // 元素高度
    const cx = mx - ex; // 鼠标距离元素左边距离
    const cy = my - ey; // 元素距离元素上面距离
    const bw = el.parentNode.clientWidth; // 浏览器宽度
    const bh = el.parentNode.clientHeight; // 浏览器高度
    document.onmousemove = function(ev) {
      const nmx = ev.clientX;
      const nmy = ev.clientY;
      const emx = nmx - cx; // 元素停止时距离浏览器左边距离
      const emy = nmy - cy; // 元素停止时距离浏览器顶部距离
      el.style.left = emx + 'px';
      el.style.top = emy + 'px';
      console.log('执行')
      if (nmx < cx) el.style.left = 0 + 'px';
      if (nmy < cy) el.style.top = 0 + 'px';
      if (nmx > bw - (ew - cx)) el.style.left = bw - ew + 'px';
      if (nmy > bh - (eh - cy)) el.style.top = bh - eh + 'px';
      
    };
    document.onmouseup = function() {
      // 清除mousemove事件
      document.onmousemove = document.onmouseup = null;
    };
  };
});
