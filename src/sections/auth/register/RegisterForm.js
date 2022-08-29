import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
// material

import {
  Card,
  Table,
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
  Stack,
  TextField,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';
import { registerAPI, getTerritoryAPI } from '../../../services/index';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();

  const [listRegion, setListRegion] = useState([]);

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');
  const [repass, setRepass] = useState('');
  const [email, setEmail] = useState('');
  const [bodyUser, setBodyUser] = useState({
    citizenID: '',
    name: '',
    gender: '',
    dateOfBirth: '',
    phone: '',
    email: '',
    idRole: '3',
    address: '',
  });
  const [statusAll, setStatusAll] = useState(0);
  const [statusAll1, setStatusAll1] = useState(0);
  const [error1, setError1] = useState('');

  const handleChangeData = (e) => {
    const { name, value } = e.target;

    setBodyUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const getTerritory = async () => {
    try {
      const res = await getTerritoryAPI();
      if (res?.data) {
        setListRegion(res?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    getTerritory();
  }, []);
  const RegisterSchema = Yup.object().shape({
    fullName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Full name is required'),
    phone: Yup.string().required('Phone number is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    username: Yup.string().required('Username is required'),
    pass: Yup.string().required('Password is required'),
    repass: Yup.string().required('Repassword is required'),
  });

  const formik = useFormik({
    initialValues: {
      citizenID: '',
      name: '',
      gender: '',
      dateOfBirth: '',
      phone: '',
      email: '',
      idRole: '2',
      address: '',
    },
    validationSchema: RegisterSchema,
  });

  const register = async (body) => {
    try {
      const res = await registerAPI(body);
      if (res?.status === 200) {
        setError1(res?.response?.data);
        navigate('/login');
      }
    } catch (error) {
      setError1(error);
    }
  };

  const getDateOfBirth = (date) => {
    let temp1 = '';
    const temp2 = date?.split('/');
    for (let i = temp2?.length - 1; i >= 0; i -= 1) {
      temp1 += temp2[i];
    }
    return temp1;
  };
  const handleClick = () => {
    const body = {
      ...bodyUser,
      dateOfBirth: getDateOfBirth(bodyUser?.dateOfBirth),
      gender: statusAll1?.toString(),
      workingTerritoryID: statusAll?.toString(),
    };
    console.log(getDateOfBirth(bodyUser?.dateOfBirth));
    register(body);
  };

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="CMND/CCCD"
              name="citizenID"
              value={bodyUser.citizenID}
              onChange={handleChangeData}
            />

            <TextField fullWidth label="Họ và Tên" name="name" value={bodyUser.name} onChange={handleChangeData} />
          </Stack>
          <Stack sx={{ display: 'flex' }}>
            <TextField
              sx={{ marginBottom: '30px' }}
              label="Ngày sinh"
              name="dateOfBirth"
              value={bodyUser.dateOfBirth}
              onChange={handleChangeData}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '30px', width: '200px' }}>
              <Box>Giới tính</Box>
              <FormControl style={{ marginTop: '-5px' }}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={statusAll1}
                  style={{ height: '30px', marginLeft: '20px' }}
                  onChange={(e) => setStatusAll1(e?.target?.value)}
                >
                  <MenuItem value={1}>Nữ</MenuItem>
                  <MenuItem value={0}>Nam</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Stack>
          <TextField
            fullWidth
            autoComplete="phone"
            // type=""
            label="phone "
            name="phone"
            value={bodyUser.phone}
            onChange={handleChangeData}
            // {...getFieldProps('username')}
            // error={Boolean(touched.username && errors.username)}
            // helperText={touched.username && errors.username}
          />

          <TextField
            fullWidth
            autoComplete="email"
            type="email"
            label="Email address"
            onChange={handleChangeData}
            name="email"
            value={bodyUser.email}
            // {...getFieldProps('email')}
            // error={Boolean(touched.email && errors.email)}
            // helperText={touched.email && errors.email}
          />
          <TextField
            fullWidth
            autoComplete="address"
            type="address"
            label="address"
            onChange={handleChangeData}
            name="address"
            value={bodyUser.address}
            // {...getFieldProps('email')}
            // error={Boolean(touched.email && errors.email)}
            // helperText={touched.email && errors.email}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
            <Box>Khu vực giao hàng</Box>
            <FormControl style={{ marginTop: '-5px' }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={statusAll}
                style={{ height: '30px', marginLeft: '20px' }}
                onChange={(e) => setStatusAll(e?.target?.value)}
              >
                {listRegion?.map((e) => (
                  <MenuItem value={e?.territoryID}>{e?.description}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          {/* <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Password"
              name="pw"
              value={bodyUser.pw}
              type={showPassword ? 'text' : 'password'}
              onChange={handleChangeData}
              // {...getFieldProps('pass')}
              // error={Boolean(touched.pass && errors.pass)}
              // helperText={touched.pass && errors.pass}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Repassword"
              name="rpw"
              value={bodyUser.rpw}
              type={showPassword ? 'text' : 'password'}
              onChange={handleChangeData}
              // {...getFieldProps('repass')}
              // error={Boolean(touched.repass && errors.repass)}
              // helperText={touched.repass && errors.repass}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack> */}
          <Typography sx={{ color: 'red', marginBottom: '20px', fontSize: '20px' }}>{error1}</Typography>
          <Button fullWidth size="large" variant="contained" onClick={handleClick}>
            Register
          </Button>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
