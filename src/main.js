import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/styles/index.less";

// vant 组件库
import Vant from "vant";
import "vant/lib/index.less";

Vue.use(Vant);

// rem适配
import "amfe-flexible";

// 引入组件
import ToutiaoIcon from "@/components/ToutiaoIcon";

// 注册icon全局组件
Vue.component("ToutiaoIcon", ToutiaoIcon);

// 测试接口是否可用
import request from "@/utils/request";
request.get("v1_0/user/channels").then(() => {
  // console.log(res);
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
