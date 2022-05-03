import store from '@/store'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/singup',
    name: 'singup',
    component: ()=> import('../views/SingupView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next)=>{
  if(to.meta.requireAuth && !store.state.user.token){
    next({name: 'login'});
  }
  else{
    next();
  }
})
export default router;
