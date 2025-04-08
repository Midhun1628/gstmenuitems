import { createRouter, createWebHistory } from 'vue-router';
import Login from '../../frontend/src/views/authentication/LoginPage.vue';
import Register from '../src/views/authentication/Register.vue';
import Dashboard from '../src/views/authentication/Dashboard.vue';
import DashboardLayout from '../../frontend/src/layouts/dashboard/DashboardLayout.vue';
import UserManagement from '../src/views/authentication/UserManagement.vue';
import ProductManagement from '../src/views/authentication/ProductManagement.vue';
// import RoleManagement from '../src/views/authentication/RoleManagement.vue';
import path from 'path';
import MenuItemsManagement from '../src/views/authentication/MenuItemsManagement.vue';

// import ProductManagement if you have it

const routes = [
  {
    path: '/login',
    component: Login,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token');
      if (token) {
        next('/');
      } else {
        next();
      }
    }
  },
  { path: '/register', component: Register},

  {
    path: '/',
    component: DashboardLayout,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token');
      if (!token) {
        next('/login');
      } else {
        next();
      }
    },
    children: [

{
  path: '',
  redirect: '/dashboard'
},

      {
        path: '/dashboard',
        component: Dashboard
      },
      {
        path: '/user-management',
        component: UserManagement,
      },
      
      {
        path: '/product-management',
        component: ProductManagement,
      },
      {
        path:'/menuitems-management',
        component:MenuItemsManagement,
      },
      // {
      //   path:'/role',
      //   component:RoleManagement
      // }
    ]
  },

,
  {
    path: '/logout',
    name: 'logout',
    beforeEnter: (to, from, next) => {
      localStorage.removeItem('token');
      next('/login');
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
