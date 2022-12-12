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
import SimpleDialog from './DetailOrderView';
import DateRangePicker from './chooseTimeRangePicker';
import { getWorkingTerritory, getRegion, getExportationAPI, updateExportationAPI, getTerritoryAPI2 } from '../services/index';
import DialogApp from './Dialog';
import ConfirmDlg from './ConfirmDlg';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'shopOrderID', label: 'Mã đơn hàng', alignRight: false },
  { id: 'shopName', label: 'Tên cửa hàng', alignRight: false },
  { id: 'packageName', label: 'Tên món hàng', alignRight: false },
  { id: 'registerDate', label: 'Ngày gửi đơn', alignRight: false },
  { id: 'shopAddress', label: 'Địa chỉ cửa hàng', alignRight: false },
  { id: 'deliveryAddress', label: 'Địa chỉ giao', alignRight: false },
  { id: 'statusDescription', label: 'Trạng thái đơn hàng', alignRight: false },
  { id: 'status', label: 'Xuất kho', alignRight: false },
];
// const { shopOrderID, shopName, shopkeeperName, shopAddress, shopPhone, registerDate } = row;

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

export default function Exportation() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openRangePicker, setOpenRangePicker] = useState(false);
  const [timeChoose, setTimeChoose] = useState('');
  const [endTimeChoose, setEndTimeChoose] = useState('');
  const [statusChoose, setStatusChoose] = useState(0);
  const [statusAllChoose, setStatusAllChoose] = useState(0);
  const [Addresses, setAddresses] = useState('');
  const [regions, setRegions] = useState([]);
  const staffID = localStorage.getItem('staffID');
  const [listProduct, setListProduct] = useState([]);
  const [regionsChoose, setRegionsChoose] = useState(0);
  const [reCall, setReCall] = useState(false);
  const [open, setOpen] = useState(false);
  const [itemProp, setItemProp] = useState({});
  const [shopName, setShopName] = useState('');
  const [error1, setError1] = useState('');
  const [openToast, setOpenToast] = useState(false);
  const [severity, setSeverity] = useState('');
  const [success, setSuccess] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [inputValues, setInputVals] = useState({});

  const [deliveryTerritories, setDeliveryTerritories] = useState([]);
  const [territoryID, setTerritoryID] = useState(0);
  const [orderID, setOrderID] = useState('');

  async function getTerritoriesAPI() {
    const res = await getTerritoryAPI2();
    if (res?.status === 200) {
      setDeliveryTerritories(res?.data);
    }
  }

  useEffect(() => {
    getTerritoriesAPI();
  }, []);

  useEffect(() => {
    getRegionAPI(territoryID);
  }, [territoryID]);


  const handleOnConfirm = () => {
    handleClickStatus(inputValues.confirmation, inputValues.shopOrderID);
    updateExportation();
  }

  async function getWorkingTerritoryAPI(id) {
    const res = await getWorkingTerritory(id);
    if (res?.status === 200) {
      getRegionAPI(res?.data);
      setAddresses(res?.data);
    }
  }
  async function getRegionAPI(id) {
    const res = await getRegion(id);
    if (res?.status === 200) {
      setRegions(res?.data);
    }
  }
  const updateExportation = async () => {
    const body = listProduct.map((e) => ({
      shopOrderID: e?.shopOrderID,
      confirmation: e?.confirmation,
      warehouseStaffID: e?.warehouseStaffID,
    }));

    try {
      const res = await updateExportationAPI(body);
      if (res?.status === 200) {
        setError1(res?.data);
        setReCall(!reCall);
        setSeverity('success');
        setOpenToast(true);
      }
    } catch (error) {
      setOpenToast(true);
      setSeverity('error');
      setError1(error?.response?.data);
    }
  };

  const getExportation = async (body) => {
    try {
      const res = await getExportationAPI(body);
      setListProduct(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   getWorkingTerritoryAPI(staffID);
  // }, []);
  useEffect(() => {
    const body = {
      staffID,
      territoryID,
      regionID: regionsChoose,
      shopName,
      shopOrderID:orderID,
    };
    getExportation(body);
  }, [staffID,territoryID, regionsChoose, shopName,orderID, reCall]);

  const handleChangeStatus = (event, id) => {
    const temp = listProduct.filter((e) => e.shopOrderID === id);
    const tempArr = listProduct.filter((e) => e.shopOrderID !== id);
    let temp1 = [];

    temp[0].migrationStatus = event;
    temp1 = temp;
    const temp2 = [...temp1, ...tempArr];
    temp2.sort((a, b) => a.shopOrderID - b.shopOrderID);
    setListProduct(temp2);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = listProduct.map((n) => n.name);
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

  const handleClickStatus = (confirmation, id) => {
    const temp = listProduct.filter((e) => e.shopOrderID === id);
    const tempArr = listProduct.filter((e) => e.shopOrderID !== id);
    let temp1 = [];

    if (confirmation === '0') {
      temp[0].confirmation = '1';
    }
    if (confirmation === '1') {
      temp[0].confirmation = '0';
    }
    temp1 = temp;
    console.log(temp1[0]?.confirmation);
    const temp2 = [...temp1, ...tempArr];
    // temp2.sort((a, b) => a.shopOrderID - b.shopOrderID);
    setListProduct(temp2);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listProduct.length) : 0;

  const filteredUsers = applySortFilter(listProduct, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="Xuất Hàng Ra Khỏi Kho">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Xuất Hàng Ra Khỏi Kho
          </Typography>
          {/* <Button variant="contained" onClick={updateExportation}>
            Lưu
          </Button> */}
        </Stack>

        <Box style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' , height: '50px' }}>
            <Box style={{ marginTop: '10px' }}>Tên cửa hàng</Box>
            <input
              style={{
                width: '120px',
                height: '25px',
                marginLeft: '72px',
                borderRadius: '25px',
                padding: '5px',
              }}
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
            />

            <Box style={{ marginTop: '10px', marginLeft: '90px' }}>Mã đơn hàng</Box>
            <input
              style={{
                width: '120px',
                height: '25px',
                marginLeft: '85px',
                borderRadius: '25px',
                padding: '5px',
              }}
              value={orderID}
              onChange={(e) => setOrderID(e.target.value)}
            />
          </Box>
        {/* <Box style={{ marginBottom: '30px' }}>
          <Box style={{ display: 'flex' }}>
            <Box>Khu vực giao hàng</Box>
            <FormControl style={{ marginTop: '-5px', marginLeft: '115px' }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                style={{ height: '30px' }}
                value={territoryID}
                onChange={(e) => {
                  console.log(e);
                  setTerritoryID(e?.target?.value);
                }}
              >
                {deliveryTerritories?.map((e) => (
                  <MenuItem value={e?.territoryID}>{e?.description}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box style={{ display: 'flex', alignItems: 'center', height: '50px' }}>
            <Box>Phường/xã giao hàng</Box>
            <FormControl style={{ marginTop: '10px', marginLeft: '95px' }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                style={{ height: '30px' }}
                value={regionsChoose}
                onChange={(e) => setRegionsChoose(e?.target?.value)}
              >
                {regions?.map((e) => (
                  <MenuItem value={e?.regionID}>{e?.description}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box> */}
        <Card>
          {/* <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} /> */}

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={listProduct.length}
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
                      shopEmail,
                      shopPhone,
                      registerDate,
                      packageName,
                      quantity,
                      mass,
                      unitPrice,
                      shippingFee,
                      totalPrice,
                      deliveryAddress,
                      shippingFeePayment,
                      fullPayment,
                      consigneeName,
                      consigneePhone,
                      consignneNote,
                      status,
                      warehouseStaffID,
                      statusDescription,
                      confirmation,
                    } = row;

                    const isItemSelected = selected.indexOf(shopName) !== -1;

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

                        <TableCell
                          align="left"
                          onClick={() => {
                            setItemProp(row);
                            setOpen(true);
                          }}
                        >
                          {shopOrderID}
                        </TableCell>
                        <TableCell
                          align="left"
                          onClick={() => {
                            setItemProp(row);
                            setOpen(true);
                          }}
                        >
                          {shopName}
                        </TableCell>
                        <TableCell
                          align="left"
                          onClick={() => {
                            setItemProp(row);
                            setOpen(true);
                          }}
                        >
                          {packageName}
                          </TableCell>
                        <TableCell
                          align="left"
                          onClick={() => {
                            setItemProp(row);
                            setOpen(true);
                          }}
                        >
                          {registerDate}
                        </TableCell>
                        <TableCell
                          align="left"
                          onClick={() => {
                            setItemProp(row);
                            setOpen(true);
                          }}
                        >
                          {shopAddress}
                        </TableCell>
                        <TableCell
                          align="left"
                          onClick={() => {
                            setItemProp(row);
                            setOpen(true);
                          }}
                        >
                          {deliveryAddress}
                        </TableCell>
                        <TableCell
                          align="left"
                          onClick={() => {
                            setItemProp(row);
                            setOpen(true);
                          }}
                        >
                          {statusDescription}
                        </TableCell>
                        {/* <FormControl style={{ marginTop: '10px' }}>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            style={{ height: '30px' }}
                            value={migrationStatus}
                            onChange={(e) => handleChangeStatus(e?.target?.value, shopOrderID)}
                          >
                            <MenuItem value={0}> Chưa xuất</MenuItem>
                            <MenuItem value={1}> Đã xuất</MenuItem>
                          </Select>
                        </FormControl> */}
                        <Button
                          sx={{ marginTop: '20px' }}
                          variant={confirmation === '0' ? 'outlined' : 'contained'}
                          onClick={() => {
                            // handleClickStatus(confirmation, shopOrderID);
                            setInputVals({ shopOrderID, confirmation });
                            setOpenConfirm(true);
                          }
                          }
                        >
                          {/* {confirmation === '0' ? 'Chưa xuất' : 'Xuất kho'} */}
                          Xuất kho
                        </Button>
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
            count={listProduct.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      <SimpleDialog open={open} itemProp={itemProp} onClose={() => setOpen(false)} />
      <DialogApp
        content={error1}
        type={0}
        isOpen={openToast}
        severity={severity}
        callback={() => {
          setOpenToast(false);
        }}
      />
      <ConfirmDlg
        title="Thông Báo"
        open={openConfirm}
        setOpen={setOpenConfirm}
        onConfirm={handleOnConfirm}
      >
        Bạn có chắc sẽ xuất kho đơn hàng này?
      </ConfirmDlg>
    </Page>
  );
}
