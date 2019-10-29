import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'HelloWorld',
      component:resolve => require(['@/components/HelloWorld'],resolve)
    },
    {
      path: '/themes/:name',
      name: 'Index',
      component:resolve => require(['@/components/Index'],resolve),
      meta: {requireAuth: true}
    },
    {
      path: '/test',
      name: 'Test',
      component:resolve => require(['@/components/test'],resolve),
    },

  //   {
  //     path:'*',
  //     redirect:'/'
  // }
  ]
})
