export interface menu {
  header?: string;
  title?: string;
  to?: string;
  chip?: string;
  chipColor?: string;
  icon?: string;
  chipVariant?: string;
}

const sidebarItem: menu[] = [
  { header: 'Main Navigation' },
  {
    title: 'Dashboard',
    icon:'tabler-layout-dashboard',
    to: '/dashboard',
  },
  {
    title: 'User Management',
    icon:'/ecommerce/products',
    to: '/users',
  },
  {
    title: 'Product Management',
    to: '/products',
  },
];

export default sidebarItem;

