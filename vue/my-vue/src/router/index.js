import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component:resolve => require(['@/components/HelloWorld'],resolve)
    },
    {
      path: '/themes/:name',
      name: 'Index',
      component:resolve => require(['@/components/Index'],resolve),
      meta: {requireAuth: true}
    },

  //   {
  //     path:'*',
  //     redirect:'/'
  // }
  ]
})
