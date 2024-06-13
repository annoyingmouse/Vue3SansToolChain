/**
 * Main entry point of the application
 * Inspiration:
 * https://github.com/maoberlehner/goodbye-webpack-building-vue-applications-without-webpack/blob/master/src/components/BaseButton.js
 * https://codepen.io/xiaomingming/pen/yVmMOz
 */

import App from "./components/App.js";

const app = Vue.createApp({
	render: () => Vue.h(App),
});

app.mount("#app");
