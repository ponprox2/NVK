import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
import {
  getWorkingTerritory,
  getRegion,
  getDetailPackage,
  updateDeliveryHistory,
  getShopOrderAssignmentAPI,
  getShopOrderDismissionAPI,
  getShopOrderAssignmentCapabilityAPI,
} from '../services/index';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'shopOrderID', label: 'shopOrderID', alignRight: false },
  { id: 'shopName', label: 'shopName', alignRight: false },
  { id: 'shopkeeperName', label: 'shopkeeperName', alignRight: false },
  { id: 'shopAddress', label: 'shopAddress', alignRight: false },
  { id: 'shopPhone', label: 'shopPhone', alignRight: false },
  { id: 'registerDate', label: 'registerDate', alignRight: false },
  { id: 'packageName', label: 'packageName', alignRight: false },
  { id: 'deliveryAddress', label: 'deliveryAddress', alignRight: false },
  { id: 'GIAODON', label: 'Giao đơn', alignRight: false },
  { id: 'deliveryAddress', label: 'Huỷ giao đơn', alignRight: false },
];

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
  const navigate = useNavigate();
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [territory, setTerritory] = useState({});
  const [regions, setRegions] = useState([]);
  const [regionsChoose, setRegionsChoose] = useState(0);
  const [statusAllChoose, setStatusAllChoose] = useState(0);
  const [Addresses, setAddresses] = useState('');
  const staffID1 = localStorage.getItem('staffID');
  const [listOrder, setListOrder] = useState([]);

  const [listUser, setListUser] = useState([]);
  const [shopName, setShopName] = useState('');
  const [packageName, setPackageName] = useState('');

  async function getWorkingTerritoryAPI(id) {
    const res = await getWorkingTerritory(id);
    if (res?.status === 200) {
      getRegionAPI(res?.data);
      setAddresses(res?.data);
    }
  }
  async function getRegionAPI(id) {
    const res = await getRegion(id?.territoryID);
    if (res?.status === 200) {
      setRegions(res?.data);
    }
  }
  async function updateDeliveryHistoryAPI() {
    const body = listUser.map((e) => ({ shopOrderID: e?.shopOrderID, status: e?.status }));

    const res = await updateDeliveryHistory(body);
    if (res?.status === 200) {
      console.log(res?.data);
    }
  }

  const handleUpdate = () => {
    updateDeliveryHistoryAPI();
  };
  async function getShopOrderAssignment() {
    const body = {
      staffID: staffID1,
      packageName1: packageName,
      shopName1: shopName,
      regionID: regionsChoose,
    };
    const res = await getShopOrderAssignmentAPI(body);
    if (res?.status === 200) {
      setListUser(res?.data);
    }
  }
  useEffect(() => {
    getShopOrderAssignment();
  }, [shopName, regionsChoose, packageName]);
  useEffect(() => {
    getWorkingTerritoryAPI(staffID1);
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

  const handleDismiss = async (id) => {
    const body = {
      shopOrderID: id,
    };
    try {
      getShopOrderDismissionAPI(body);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCapability = async (id) => {
    try {
      const res = getShopOrderAssignmentCapabilityAPI(id);

      navigate(`/dashboard/orderHistory?id=${id}`);
    } catch (error) {
      console.log(error);
    }
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

  const handleChangeStatus = (event, id) => {
    const temp = listUser.filter((e) => e.shopOrderID === id);
    const tempArr = listUser.filter((e) => e.shopOrderID !== id);
    let temp1 = [];

    temp[0].status = event?.target?.value;
    temp1 = temp;

    const temp2 = [...temp1, ...tempArr];
    temp2.sort((a, b) => a.id - b.id);
    setListUser(temp2);
  };
  const handleChangeDeliveryStatus = (e) => {
    setStatusAllChoose(e.target.value);
  };
  const handleChangeRegion = (e) => {
    setRegionsChoose(e.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listUser.length) : 0;

  const filteredUsers = applySortFilter(listUser, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Giao Đơn Hàng Cho Nhân Viên Vận Chuyển
          </Typography>
          <Button
            variant="contained"
            // component={RouterLink}
            // to="#"
            onClick={handleUpdate}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Lưu
          </Button>
        </Stack>
        <Box>
          <Box style={{ display: 'flex' }}>
            <Box>Địa bàn: </Box>
            <Box style={{ marginLeft: '150px' }}>{Addresses?.description} </Box>
          </Box>
          <Box style={{ display: 'flex', alignItems: 'center', height: '50px' }}>
            <Box>Phường/Xã: </Box>
            <FormControl style={{ marginTop: '10px', marginLeft: '110px' }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                style={{ height: '30px' }}
                value={regionsChoose}
                onChange={(e) => handleChangeRegion(e)}
              >
                {regions?.map((e) => (
                  <MenuItem value={e?.regionID}>{e?.description}</MenuItem>
                ))}
                {/* <MenuItem value={0}>Chưa giao</MenuItem>
                <MenuItem value={1}>Giao thành công</MenuItem>
                <MenuItem value={2}>Giao thất bại</MenuItem> */}
              </Select>
            </FormControl>
          </Box>
          {/* <Box style={{ display: 'flex', alignItems: 'center', height: '50px' }}>
            <Box>Trạng thái xác nhận: </Box>
            <FormControl style={{ marginTop: '10px', marginLeft: '50px' }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={statusAllChoose}
                style={{ height: '30px' }}
                onChange={(e) => handleChangeDeliveryStatus(e)}
              >
                <MenuItem value={0}>Tất Cả</MenuItem>
                <MenuItem value={1}>Chưa xác nhận</MenuItem>
                <MenuItem value={2}>Đã xác nhận</MenuItem>
                <MenuItem value={3}>Chờ thu gom</MenuItem>
              </Select>
            </FormControl>
          </Box> */}
        </Box>
        <Box style={{ marginBottom: '30px' }}>
          <Box sx={{ display: 'flex', marginBottom: '15px', alignItems: 'center', height: '56px' }}>
            <Typography textAlign="center">Tên Cửa Hàng : </Typography>
            <input
              style={{
                width: '120px',
                height: '25px',
                marginLeft: '70px',
                borderRadius: '25px',
                padding: '5px',
              }}
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
            />
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Typography>Tên Món Hàng : </Typography>
            <input
              style={{
                width: '120px',
                height: '25px',
                marginLeft: '65px',
                borderRadius: '25px',
                padding: '5px',
              }}
              value={packageName}
              onChange={(e) => setPackageName(e.target.value)}
            />
          </Box>
        </Box>

        <Card>
          {/* <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} /> */}

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  // order={order}
                  // orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={listUser.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const {
                      shopOrderID,
                      shopName,
                      shopkeeperName,
                      shopAddress,
                      packageName,
                      shopPhone,
                      registerDate,
                      deliveryAddress,
                    } = row;

                    const isItemSelected = selected.indexOf(shopOrderID) !== -1;

                    return (
                      <TableRow
                        hover
                        key={shopOrderID}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          {/* <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, name)} /> */}
                        </TableCell>

                        <TableCell align="left">{shopOrderID}</TableCell>
                        <TableCell align="left">{shopName}</TableCell>
                        <TableCell align="left">{shopkeeperName}</TableCell>
                        <TableCell align="left">{shopAddress}</TableCell>

                        <TableCell align="left">{shopPhone}</TableCell>
                        <TableCell align="left">{registerDate}</TableCell>
                        <TableCell align="left">{packageName}</TableCell>
                        <TableCell align="left">{deliveryAddress}</TableCell>
                        <TableCell align="left">
                          <Button onClick={() => handleCapability(shopOrderID)}>Giao</Button>
                        </TableCell>
                        <TableCell align="left">
                          <Button onClick={() => handleDismiss(shopOrderID)}>Huỷ</Button>
                        </TableCell>

                        {/* <TableCell align="right">
                          <UserMoreMenu />
                        </TableCell> */}
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
