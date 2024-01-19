import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/LoginView.vue'),
      meta: {requiresGuest : true}
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/auth/RegisterView.vue'),
      meta: {requiresGuest : true}
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/auth/UserView.vue'),
      meta: {requiresAuth : true}
    },
  ]
});

router.beforeEach((to,from, next) => {
  const store = useAuthStore();
  
  if(to.meta.requiresAuth && !store.isAuthenticated){
    // localStorage.setItem('unauthenticated',store.isAuthenticated.valueOf.toString())
    
    return next({name : 'login', query : { redirect : to.fullPath}});
    
  }else if(to.meta.requiresGuest && store.isAuthenticated){
    // localStorage.setItem('authenticated',store.isAuthenticated.valueOf.toString())
    
    return next({name : 'home'});

  }else{
    // localStorage.setItem('here','rien');
    next();

  }
});

export default router
