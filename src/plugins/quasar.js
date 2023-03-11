/*
 * @Author: zulezhe
 * @Date: 2022-01-02 21:10:38
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-03-05 16:14:04
 * @Path: https://gitee.com/zulezhe/
 * @Description:
 */
import Vue from 'vue';
import 'quasar/dist/quasar.css';
import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css';
import '@quasar/extras/material-icons-round/material-icons-round.css';
import '@quasar/extras/material-icons-sharp/material-icons-sharp.css';
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css';
import { Quasar, QInput, QSelect, QForm, QIcon, QPopupProxy, QDate, QBtn, QAvatar, Notify } from 'quasar';
Vue.use(Quasar, {
  config: {},
  plugins: {
    QInput,
    QSelect,
    QForm,
    QIcon,
    QPopupProxy,
    QDate,
    QBtn,
    QAvatar,
    Notify
  }
});
