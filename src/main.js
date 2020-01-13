import Vue from 'vue';
import VCalendar from 'v-calendar';
import App from './App.vue';

Vue.use(VCalendar, {
  componentPrefix: 'vc',
});
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
