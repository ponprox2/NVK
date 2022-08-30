import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Link, Stack, Checkbox, TextField, IconButton, InputAdornment, FormControlLabel, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import Iconify from '../../../components/Iconify';
import { loginAPI } from '../../../services/index';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const[error1, setError1] = useState('');

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true,
    },
    validationSchema: LoginSchema,
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleClick = async () => {
    const body = {
      username: userName,
      pass: password,
      idRole: 2,
    };
    try {
      const res = await loginAPI(body);
      if (res?.status === 200) {
        localStorage.setItem('staffID', userName);
        navigate('/dashboard/products');
      }
    } catch (error) {
      setError1(error?.response.data);
    }
  };
  return (
    <FormikProvider value={formik}>
       <Typography sx={{ color: 'red', marginBottom: '20px', fontSize: '20px' }}>{error1}</Typography>
      <Form autoComplete="off" noValidate>
        <Stack spacing={3}>
          <TextField fullWidth autoComplete="username" onChange={(e) => setUserName(e.target.value)} />

          <TextField
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          />

          <Link component={RouterLink} variant="subtitle2" to="#" underline="hover">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          onClick={handleClick}
        >
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
