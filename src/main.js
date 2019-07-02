import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import router from './router'

Vue.use(ElementUI)

Vue.mixin({
  beforeUpdate: function addChild() {
    console.log(this.children)
    this.$slots.default = (this.children || []).map(child =>
      this.$createElement(child.component || child.name, {
        attrs: {
          'data-id': child.id
        },
        ref: child.id,
        refInFor: true
      })
    )
  }
})

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
