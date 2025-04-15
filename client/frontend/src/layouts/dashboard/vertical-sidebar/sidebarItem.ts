export interface menu {
  header?: string;
  title?: string;
  to?: string;

}

const sidebarItem: menu[] = [
  {
    title: 'Dashboard',

    to: '/dashboard'
  },
  {
    title: 'User Management',
  
    to: '/user-management'
  },
  {
    title: 'Product Management',

    to: '/product-management',
  },
  {
    title:'Menu Management',
    to:'/menuitems-management',
  },
  {
    title: 'Role Management',
    to: '/role-management'
  },
  {
    title:'Permission Management',
    to:'/permission-management'
  },
  {
    title:'Role Permission Management',
    to:'/rolePermission-management'
  }
];

export default sidebarItem;