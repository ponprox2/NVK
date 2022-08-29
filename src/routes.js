import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import AddProduct from './pages/addProduct';
import DetailOrder from './pages/detailOrder';
import UpdProduct from './pages/updateProduct';
import Exportation from './pages/Exportation';
import ConfirmOrder from './pages/ConfirmOrder';
import UpdateWareHose from './pages/UpdateWareHose';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'order', element: <Blog /> },
        // { path: 'login', element: <Login /> },
        { path: 'addProduct', element: <AddProduct /> },
        { path: 'register', element: <Register /> },
        { path: 'updateProduct/', element: <UpdProduct /> },
        { path: 'orderDetail/', element: <DetailOrder /> },
        { path: 'orderHistory/', element: <DetailOrder /> },
        { path: 'Exportation/', element: <Exportation /> },
        { path: 'confirmOrder/', element: <ConfirmOrder /> },
        { path: 'updateWareHose/', element: <UpdateWareHose /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
