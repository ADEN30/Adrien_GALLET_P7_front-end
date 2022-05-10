import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/singup',
    name: 'singup',
    component: ()=> import('../views/SingupView.vue')
  },
  {
    path: '/posts',
    name: 'posts',
    component: ()=> import('../views/PostsView.vue'),
    meta: {requireAuth: true}
  },
  {
    path: '/modif',
    name: 'modif',
    component: ()=> import('../views/PostsView.vue'),
    meta: {requireAuth: true}
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next)=>{
  if(to.meta.requireAuth && !localStorage.getItem("token")){
    next({name: 'login'});
  }
  else{
    next();
  }
})
export default router;
