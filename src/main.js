import Vue from 'vue'
import App from './App.vue'

import 'video.js/dist/video-js.css'
import './videojs_ABdm.css'
import './videojs_ABdm.js'

Vue.config.productionTip = false


new Vue({
  render: h => h(App),
}).$mount('#app')
