/*
 * @Author: your name
 * @Date: 2020-10-26 00:56:12
 * @LastEditTime: 2022-12-04 22:09:52
 * @LastEditors: zulezhe
 * @Description: In User Settings Edit
 * @FilePath: \moafly-spa\src\components\loading\index.js
 */
/*
    自定义 loading 组件
    调用
    this.$loading('正在加载中...');
    this.$loading.close();
*/

let _LOADING = {
  show: false, // Boolean loading显示状态
  component: null // Object loading组件
};
export default {
  install(Vue) {
    /*
      text: String
      type: String
  */
    Vue.prototype.$loading = function(type, time = 2000) {
      if (type == 'close') {
        setTimeout(() => {
          _LOADING.component.show = _LOADING.show = false;
        }, time);
      } else {
        if (_LOADING.show) {
          return;
        }
        let LoadingCompoent = Vue.extend({
          data: function() {
            return {
              show: _LOADING.show
            };
          },
          template: ` <div class="w-loading loading-container" v-show="show">
                        <div class="sk-chase">
                          <div class="sk-chase-dot"></div>
                          <div class="sk-chase-dot"></div>
                          <div class="sk-chase-dot"></div>
                          <div class="sk-chase-dot"></div>
                          <div class="sk-chase-dot"></div>
                          <div class="sk-chase-dot"></div>
                        </div>
                      </div>`
        });
        _LOADING.component = new LoadingCompoent();
        let element = _LOADING.component.$mount().$el;
        document.body.appendChild(element);
        _LOADING.component.show = _LOADING.show = true;
      }
    };
    // 打开/关闭
    ['open', 'close'].forEach(function(type) {
      Vue.prototype.$loading[type] = function(time) {
        return Vue.prototype.$loading(type, time);
      };
    });
  }
};
