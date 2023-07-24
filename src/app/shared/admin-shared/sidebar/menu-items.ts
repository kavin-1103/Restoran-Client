import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
 
  {
    path: '/dashboard',
    title: 'Dashboard',
    icon: 'bi bi-speedometer2',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/dashboard/food-item',
    title: 'Food Item',
    icon: 'bi bi-card-text',
    class: '',
    extralink: false,
    submenu: []
  },  
  {
    path: '/dashboard/dining-table',
    title: 'Dining Table',
    icon: 'bi bi-layout-split',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/dashboard/order-detail',
    title: 'Order Details',
    icon: 'bi bi-people',
    class: '',
    extralink: false,
    submenu: []
  },
  
];
