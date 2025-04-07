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
    to: '/product-management'
  },
  // {
  //   title: 'Role Management',
  //   to: '/role'
  // },
  {
    title:'Menu Items',
    to:'/menuitems'
  }
];

export default sidebarItem;