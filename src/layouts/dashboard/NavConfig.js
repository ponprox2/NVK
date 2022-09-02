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
    title: 'Xác Nhận Đơn Hàng Từ Cửa Hàng',
    path: '/dashboard/products',
    //  icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'Nhập Hàng Vào Kho',
    path: '/dashboard/order',
    //  icon: getIcon('eva:alert-triangle-fill'),
  },
  {
    title: 'Giao Đơn Hàng ',
    path: '/dashboard/user',
    //  icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Giao đơn lấy hàng  ',
    path: '/dashboard/user1',
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
    title: 'logout',
    path: '/login',
    // icon: getIcon('eva:lock-fill'),
  },
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
