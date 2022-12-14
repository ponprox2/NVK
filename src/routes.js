import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import User1 from './pages/User1';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import AddProduct from './pages/addProduct';
import DetailOrder from './pages/detailOrder';
import DetailOrderView1 from './pages/DetailOrderView1';
import UpdProduct from './pages/updateProduct';
import Exportation from './pages/Exportation';
import ConfirmOrder from './pages/ConfirmOrder';
import UpdateWareHose from './pages/UpdateWareHose';
import StaffInfo from './pages/StaffInfo';
import RetrieveOrders from './pages/RetrieveOrders';
import CancelOrders from './pages/CancelOrders';
import ShipBack from './pages/ShipBack';
import FreeShipBackShippers from './pages/FreeShipBackShippers';
import ReturnResults from './pages/ReturnResults';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'shopOrdersDelivery', element: <User /> },
        { path: 'shopOrdersPickUp', element: <User1 /> },
        { path: 'shopOrdersConfirming', element: <Products /> },
        { path: 'importations', element: <Blog /> },
        // { path: 'login', element: <Login /> },
        { path: 'addProduct', element: <AddProduct /> },
        { path: 'register', element: <Register /> },
        { path: 'updateProduct/', element: <UpdProduct /> },
        { path: 'orderDetail/', element: <DetailOrder /> },
        { path: 'freePickUpShippers/', element: <DetailOrderView1 /> },
        { path: 'freeDeliveryShippers/', element: <DetailOrder /> },
        { path: 'Exportation/', element: <Exportation /> },
        { path: 'confirmOrder/', element: <ConfirmOrder /> },
        { path: 'updateWareHose/', element: <UpdateWareHose /> },
        { path: 'staffInfo/', element: <StaffInfo /> },
        { path: 'retrieveOrders/', element: <RetrieveOrders /> },
        { path: 'cancelOrders/', element: <CancelOrders /> },
        { path: 'shipBack/', element: <ShipBack /> },
        { path: 'returnResults/', element: <ReturnResults /> },
        { path: 'freeShipBackShippers/', element: <FreeShipBackShippers /> },
        { path: 'returnResults/', element: <ReturnResults /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/shopOrdersConfirming" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
