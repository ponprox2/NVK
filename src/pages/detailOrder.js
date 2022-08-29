import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Box,
  Divider,
} from '@mui/material';
// components
import axios from 'axios';
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
import TableProduct from './tableDetailProduct';
import { getDetailPackageAPI, getShopOrderHistoryAPI, getFreeShiperAPI, shipperAssigmentAPI } from '../services/index';

const TABLE_HEAD = [
  { id: 'STT', label: 'STT', alignRight: false },
  { id: 'time', label: 'Mã shipper', alignRight: false },
  { id: 'staffName', label: 'Tên shipper', alignRight: false },
  { id: 'status', label: 'Xác nhận giao đơn', alignRight: false },
];

function DetailOrder() {
  const { search } = useLocation();
  const id = search.split('=')[1];
  const navigate = useNavigate();

  const [orderDetail, setOrderDetail] = useState({});
  const [listOrderDetail, setListOrderDetail] = useState([]);
  const [shipperName, setShipperName] = useState('');
  const [error1, setError1] = useState('');
  const staffId = localStorage.getItem('staffID')

  const getDetailPackage = async (body) => {
    try {
      const res = await getDetailPackageAPI(body);
      setOrderDetail(res?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getFreeShiper = async (body) => {
    try {
      const res = await getFreeShiperAPI(body);
      if (res?.data) {
        setListOrderDetail(res?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const body = {
      shopOrderID: id,
      isDetail: 1,
    };
    getDetailPackage(body);
  }, []);

  useEffect(() => {
    const body = {
      shopOrderID: id,
      shipperName1: shipperName,
    };
    getFreeShiper(body);
  }, [shipperName]);

  const handleAssignment = async (idShipper) => {
    const body = {
      shopOrderID: id,
      warehouseStaffID: staffId,
      shipperID: idShipper,
    };
    try {
      const res = await shipperAssigmentAPI(body);
      console.log(res);
      if (res?.status === 200) {
        navigate('/dashboard/user');
      }
    } catch (error) {
      setError1(error.response.message)
    }
  };
  return (
    <>
      <Box>
        <Box style={{ margin: '20px 0px 50px 30px' }}> </Box>
        <Box style={{ width: '90%', margin: '0 auto', display: 'flex', justifyContent: 'space-between' }}>
          <Box width="90%">
            <h2 style={{ lineHeight: '30px' }}>Giao Đơn Hàng Cho Nhân Viên Vận Chuyển</h2>
            <Divider />
            <Typography style={{ lineHeight: '30px' }}>Mã đơn hàng : {orderDetail?.shopOrderID}</Typography>
            <Typography style={{ lineHeight: '25px' }}>Tên cửa hàng : {orderDetail?.shopName}</Typography>
            {/* <Typography style={{ lineHeight: '25px' }}>Chủ Cửa Hàng : {orderDetail?.shopkeeperName}</Typography>
            <Typography style={{ lineHeight: '25px' }}>Địa Chỉ Cửa Hàng : {orderDetail?.shopAddress}</Typography>
            <Typography style={{ lineHeight: '30px' }}>shopEmail : {orderDetail?.shopEmail}</Typography>
            <Typography style={{ lineHeight: '25px' }}>shopPhone : {orderDetail?.shopPhone}</Typography> */}

            <Typography style={{ lineHeight: '25px' }}>Thời gian gửi đơn : {orderDetail?.registerDate}</Typography>
            <Typography style={{ lineHeight: '30px' }}>Tên món hàng : {orderDetail?.packageName} </Typography>

            <Typography style={{ lineHeight: '25px' }}>Số lượng: {orderDetail?.quantity}</Typography>
            <Typography style={{ lineHeight: '25px' }}>Khối lượng : {orderDetail?.mass}</Typography>
            <Typography style={{ lineHeight: '30px' }}>Đơn giá: {orderDetail?.unitPrice} vnđ</Typography>

            <Typography style={{ lineHeight: '25px' }}>Phí vận chuyển : {orderDetail?.shippingFee} vnđ</Typography>
            <Typography style={{ lineHeight: '25px' }}>Tổng tiền : {orderDetail?.totalPrice} vnđ</Typography>
            <Typography style={{ lineHeight: '30px' }}>
              Thanh toán phí vận chuyển: {orderDetail?.shippingFeePayment ? 'Chưa thanh toán' : 'Đã thanh toán'}
            </Typography>

            <Typography style={{ lineHeight: '25px' }}>
              Thanh toán toàn bộ: {orderDetail?.fullPayment ? 'Chưa thanh toán' : 'Đã thanh toán'}{' '}
            </Typography>
            <Typography style={{ lineHeight: '25px' }}>Địa chỉ giao hàng : {orderDetail?.deliveryAddress}</Typography>
          </Box>
        </Box>
        <Typography>
          {error1}
        </Typography>
        {/* <Box width="49%">
            <h2 style={{ lineHeight: '30px' }}>Hàng hoá</h2>
            <Divider />
          
        </Box> */}
        {/* <Box width="90%" m="auto">
          <h2 style={{ lineHeight: '30px' }}>Người nhận</h2>
          <Divider />
          <Typography style={{ lineHeight: '30px' }}>Tên người nhận : {orderDetail?.consigneeName}</Typography>
          <Typography style={{ lineHeight: '25px' }}>SĐT người nhận : {orderDetail?.consigneePhone}</Typography>
          <Typography style={{ lineHeight: '25px' }}>Ghi chú : {orderDetail?.consignneNote}</Typography>

        </Box> */}
        <Box sx={{ display: 'flex', margin: '80px 0 0 100px' }}>
          <Typography>Tên shipper : </Typography>
          <input
            style={{
              width: '120px',
              height: '25px',
              marginLeft: '65px',
              borderRadius: '25px',
              padding: '5px',
            }}
            value={shipperName}
            onChange={(e) => setShipperName(e.target.value)}
          />
        </Box>
        <Box
          style={{
            width: '80%',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-evenly',
            marginTop: '50px',
          }}
        >
          <Table>
            <UserListHead headLabel={TABLE_HEAD} />
            <TableBody>
              {listOrderDetail?.map((value, index) => (
                <TableRow hover tabIndex={-1} role="checkbox">
                  <TableCell padding="checkbox">{/* <Checkbox /> */}</TableCell>

                  <TableCell align="left">{index + 1}</TableCell>
                  <TableCell align="left">{value?.staffID}</TableCell>
                  <TableCell align="left">{value?.name}</TableCell>
                  <TableCell align="left">
                    <Button onClick={() => handleAssignment(value?.staffID)}>Giao</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </>
  );
}

export default DetailOrder;
