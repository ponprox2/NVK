import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
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
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Box,
} from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'shippingID', label: 'shippingID', alignRight: false },
  { id: 'packageName', label: 'packageName', alignRight: false },
  { id: 'deliveryAddress', label: 'deliveryAddress', alignRight: false },
  { id: 'consigneeName', label: 'consigneeName', alignRight: false },
  { id: 'deliveryStatus', label: 'deliveryStatus', alignRight: false },
  { id: 'paymentStatus', label: 'paymentStatus', alignRight: false },
];
// id: 1,
// shippingID: 123,
// packageName: 'giay the thao',
// deliveryAddress: 1,
// consigneeName: 20,
// deliveryStatus: 100000,
// deliveryAddress: '99 Man Thiện, Phường Hiệp Phú, Thành Phố Thủ Đức',
// paymentStatus: true,
// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [listUser, setListUser] = useState([
    {
      id: 1,
      shippingID: 123,
      packageName: 'giay the thao',
      consigneeName: 20,
      deliveryStatus: 0,
      deliveryAddress: '99 Man Thiện, Phường Hiệp Phú, Thành Phố Thủ Đức',
      paymentStatus: 0,
    },
    {
      id: 2,
      shippingID: 2,
      packageName: 'giay the thao',
      consigneeName: 20,
      deliveryStatus: 0,
      deliveryAddress: '99 Man Thiện, Phường Hiệp Phú, Thành Phố Thủ Đức',
      paymentStatus: 0,
    },
    {
      id: 3,
      shippingID: 3,
      packageName: 'giay the thao',
      consigneeName: 20,
      deliveryStatus: 0,
      deliveryAddress: '99 Man Thiện, Phường Hiệp Phú, Thành Phố Thủ Đức',
      paymentStatus: 0,
    },
  ]);
  // const [age, setAge] = useState('');

  const handleChange = (event, id) => {
    const temp = listUser.filter((e) => e.id === id);
    const tempArr = listUser.filter((e) => e.id !== id);
    let temp1 = [];
    temp[0].paymentStatus = event.target.value;
    temp1 = temp;
    const temp2 = [...temp1, ...tempArr];
    temp2.sort((a, b) => a.id - b.id);
    setListUser(temp2);
  };

  const handleChangeDeliveryStatus = (event, id) => {
    const temp = listUser.filter((e) => e.id === id);
    const tempArr = listUser.filter((e) => e.id !== id);
    let temp1 = [];
    temp[0].deliveryStatus = event.target.value;
    temp1 = temp;
    const temp2 = [...temp1, ...tempArr];
    temp2.sort((a, b) => a.id - b.id);
    setListUser(temp2);
  };

  useEffect(() => {
    async function loadListUser() {
      const res = await axios.get('http://localhost:3000/api/v1/users');
      setListUser(res.data);
    }
    loadListUser();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = listUser.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleChangeStatus = (id) => {
    const temp = listUser.filter((e) => e.id === id);
    const tempArr = listUser.filter((e) => e.id !== id);
    let temp1 = [];
    if (temp[0].paymentStatus === true) {
      temp[0].paymentStatus = false;
      temp1 = temp;
    } else {
      temp[0].paymentStatus = true;
      temp1 = temp;
    }
    const temp2 = [...temp1, ...tempArr];
    temp2.sort((a, b) => a.id - b.id);
    setListUser(temp2);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listUser.length) : 0;

  const filteredUsers = applySortFilter(listUser, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Xác Nhận Trạng Thái Giao Hàng
          </Typography>
          <Button variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>
            Lưu
          </Button>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={listUser.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const {
                      id,
                      shippingID,
                      packageName,
                      deliveryAddress,
                      consigneeName,
                      deliveryStatus,
                      paymentStatus,
                    } = row;
                    // id:1,
                    // shippingID:123,
                    // packageName:'giay the thao',
                    // deliveryAddress:1,
                    // consigneeName:20,
                    // deliveryStatus:100000,
                    // deliveryAddress:'99 Man Thiện, Phường Hiệp Phú, Thành Phố Thủ Đức',
                    // paymentStatus:true,
                    // Đang để mặc đinh là active vì chưa có thuộc tính 'paymentStatus'
                    // const paymentStatus = 'active';

                    const isItemSelected = selected.indexOf(shippingID) !== -1;

                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          {/* <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, name)} /> */}
                        </TableCell>
                        {/* <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={name} src={avatarUrl} />
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell> */}
                        {/* const { id, shippingID, packageName, deliveryAddress, consigneeName, deliveryStatus, deliveryAddress, paymentStatus } = row; */}
                        <TableCell align="left">{shippingID}</TableCell>
                        <TableCell align="left">{packageName}</TableCell>
                        <TableCell align="left">{deliveryAddress}</TableCell>
                        <TableCell align="left">{consigneeName}</TableCell>

                        {/* <TableCell align="left">{deliveryStatus}</TableCell> */}
                        {/* <TableCell align="left" onClick={() => handleChangeStatus(id)}>
                          {paymentStatus ? 'nhan' : 'huy'}
                        </TableCell> */}
                        <TableCell>
                          <FormControl style={{ marginTop: '10px' }}>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={deliveryStatus}
                              onChange={(e) => handleChangeDeliveryStatus(e, id)}
                            >
                              <MenuItem value={0}>Chưa giao</MenuItem>
                              <MenuItem value={1}>Giao thành công</MenuItem>
                              <MenuItem value={2}>Giao thất bại</MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                        <TableCell>
                          <FormControl style={{ marginTop: '10px' }}>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={paymentStatus}
                              onChange={(e) => handleChange(e, id)}
                            >
                              <MenuItem value={0}>Chưa thanh toán</MenuItem>
                              <MenuItem value={1}>Đã thanh toán phí ship</MenuItem>
                              <MenuItem value={2}>Đã thanh toán toàn bộ</MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>

                        {/**/}

                        <TableCell align="right">
                          <UserMoreMenu />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={listUser.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
