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
import DateRangePicker from './chooseTimeRangePicker';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'stt', label: 'STT', alignRight: false },
  { id: 'shippingID', label: 'shippingID', alignRight: false },
  { id: 'packageName', label: 'packageName', alignRight: false },
  { id: 'quantity', label: 'quantity', alignRight: false },
  { id: 'mass', label: 'mass (Kg)', alignRight: false },
  { id: 'unitPrice', label: 'unitPrice (VND)', alignRight: false },
  { id: 'deliveryAddress', label: 'deliveryAddress', alignRight: false },
];

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

  const [listProduct, setListProduct] = useState([
    { id: 1, name: 'pon', price: 11111, discount: 15, status: true, address: '97 man thien' },
  ]);

  // useEffect(() => {
  //   async function loadListProduct() {
  //     const res = await axios.get('http://localhost:3000/api/v1/products');
  //     setListProduct(res.data);
  //   }
  //   loadListProduct();
  // }, []);
  const handleChangeStatus = (id) => {
    const temp = listProduct.filter((e) => e.id === id);
    const tempArr = listProduct.filter((e) => e.id !== id);
    let temp1 = [];
    if (temp[0].status === true) {
      temp[0].status = false;
      temp1 = temp;
    } else {
      temp[0].status = true;
      temp1 = temp;
    }
    const temp2 = [...temp1, ...tempArr];
    temp2.sort((a, b) => a.id - b.id);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listProduct.length) : 0;

  const filteredUsers = applySortFilter(listProduct, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="Product">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Product
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/addProduct"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New product
          </Button>
        </Stack>
        <Box style={{ marginBottom: '30px' }}>
          <Box style={{ display: 'flex' }}>
            <Box>Nhà kho: </Box>
            <Box style={{ marginLeft: '150px' }}>97 man thien </Box>
          </Box>
          <Box style={{ display: 'flex', alignItems: 'center', height: '50px' }}>
            <Box>Địa chỉ kho: </Box>
            <FormControl style={{ marginTop: '10px', marginLeft: '110px' }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                style={{ height: '30px' }}
                // value={regionsChoose}
                // onChange={(e) => handleChangeRegion(e)}
              >
                {/* {regions?.map((e) => (
                  <MenuItem value={e?.regionID}>{e?.adminDivision2}</MenuItem>
                ))} */}
                {/* <MenuItem value={0}>Chưa giao</MenuItem>
                <MenuItem value={1}>Giao thành công</MenuItem>
                <MenuItem value={2}>Giao thất bại</MenuItem> */}
              </Select>
            </FormControl>
          </Box>

          <Box onClick={() => setOpenRangePicker(true)}>
            Thời gian thống kê: {timeChoose} - {endTimeChoose}{' '}
          </Box>

          <DateRangePicker
            openTime={openRangePicker}
            setOpenTime={setOpenRangePicker}
            timeChoose={timeChoose}
            setTimeChoose={setTimeChoose}
            endTimeChoose={endTimeChoose}
            setEndTimeChoose={setEndTimeChoose}
          />
        </Box>
        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

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
                    const id = row.id;
                    const name = row.name;
                    const price = row.price;
                    const discount = row.discount;
                    const status = row.status;
                    const address = row.address;

                    const isItemSelected = selected.indexOf(name) !== -1;

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
                          <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, name)} />
                        </TableCell>

                        <TableCell align="left" onClick={() => navigate(`/dashboard/updateProduct?id=${id}`)}>
                          {name}
                        </TableCell>
                        <TableCell align="left">{id}</TableCell>
                        <TableCell align="left">{name}</TableCell>
                        <TableCell align="left">{price}</TableCell>
                        <TableCell align="left">{discount}</TableCell>
                        <TableCell align="left" onClick={() => handleChangeStatus(id)}>
                          {status ? 'xuat' : 'nhap'}
                        </TableCell>
                        <TableCell align="left">{address}</TableCell>
                        {/* <Button>123</Button> */}

                        {/* <TableCell align="right">
                          <UserMoreMenu id={id} />
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
            count={listProduct.length}
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
