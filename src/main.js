import Vue from 'vue'
import App from './App.vue'
import { store } from './store/store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { Slider } from 'ant-design-vue';
import { Switch } from 'ant-design-vue';
import { Input } from 'ant-design-vue';
import { Layout } from 'ant-design-vue';
import { Menu } from 'ant-design-vue';
import { Tabs } from 'ant-design-vue';
import { Icon } from 'ant-design-vue';
import { Row, Col } from 'ant-design-vue';
import { AutoComplete } from 'ant-design-vue';
import { DatePicker } from 'ant-design-vue';
import { Checkbox } from 'ant-design-vue';
import { Select } from 'ant-design-vue';
import { Button } from 'ant-design-vue';
import { Badge } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

Vue.use(Slider);
Vue.use(Switch);
Vue.use(Input);
Vue.use(Layout);
Vue.use(Menu);
Vue.use(Icon);
Vue.use(Tabs);
Vue.use(Row);
Vue.use(Col);
Vue.use(AutoComplete);
Vue.use(DatePicker);
Vue.use(Checkbox);
Vue.use(Select);
Vue.use(Button);
Vue.use(Badge);


// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
