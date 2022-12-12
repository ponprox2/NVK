// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  // {
  //   title: 'dashboard',
  //   path: '/dashboard/app',
  //   icon: getIcon('eva:pie-chart-2-fill'),
  // },
  {
    title: 'Xác Nhận Đơn Hàng',
    path: '/dashboard/shopOrdersConfirming',
    //  icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'Giao đơn lấy hàng  ',
    path: '/dashboard/shopOrdersPickUp',
    //  icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Lưu Hàng Vào Kho',
    path: '/dashboard/importations',
    //  icon: getIcon('eva:alert-triangle-fill'),
  },
  {
    title: 'Giao Đơn Giao Hàng',
    path: '/dashboard/shopOrdersDelivery',
    //  icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Xuất Hàng Ra Khỏi Kho',
    path: '/dashboard/Exportation',
    //  icon: getIcon('eva:file-text-fill'),
  },
  {
    title: 'Xác Nhận Kết Quả Giao Hàng',
    path: '/dashboard/confirmOrder',
    //  icon: getIcon('eva:file-text-fill'),
  },
  {
    title: 'Thu Hồi Đơn Hàng',
    path: '/dashboard/retrieveOrders',
  },
  {
    title: 'Hủy Đơn Hàng',
    path: '/dashboard/cancelOrders',
  },
  {
    title: 'Giao Đơn Trả Hàng',
    path: '/dashboard/shipBack',
  },
  {
    title: 'Xác Nhận Kết Quả Trả Hàng',
    path: '/dashboard/returnResults',
  },
  // {
  //   title: 'logout',
  //   path: '/login',
  //   // icon: getIcon('eva:lock-fill'),
  // },
  // {
  //   title: 'register',
  //   path: '/dashboard/register',
  //   icon: getIcon('eva:person-add-fill'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon('eva:alert-triangle-fill'),
  // },
];

export default navConfig;
