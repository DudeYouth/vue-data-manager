import Vue from 'vue'
import Router from 'vue-router'
import Cut from '@/components/Cut'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Cut',
      component: Cut
    }
  ]
})
