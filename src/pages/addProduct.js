import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { styled } from '@mui/material/styles';
// material
import { Stack, TextField, Box, Typography, Card } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import ImageUploading from 'react-images-uploading';
import axios from 'axios';
// component
// import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

export default function AddProduct() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [bodyProductByID, setBodyProductByID] = useState({
    n: '',
    p: '',
    ss: '',
    sm: '',
    sl: '',
    d: '',
    c: '',
    des: '',
    bs64: '',
  });
  const handleChangeData = (e) => {
    const { name, value } = e.target;
    setBodyProductByID((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const onChange = (imageList, addUpdateIndex) => {
    setBodyProductByID((prevState) => ({
      ...prevState,
      bs64: imageList[0].data_url,
    }));
  };
  const handleAddProduc = () => {
    async function AddProduct() {
      const res = await axios.post(`http://localhost:3000/api/v1/products/`, bodyProductByID);
      if (res.data.status === 'Product created') {
        navigate('/dashboard/products');
      }
    }
    AddProduct();
  };
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
    onSubmit: () => {
      navigate('/dashboard', { replace: true });
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <Box style={{ display: 'flex', width: '100%', justifyContent: 'space-evenly' }}>
      <FormikProvider value={formik} style={{ width: '70%' }}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Typography variant="h4" gutterBottom>
            Tạo sản phẩm
          </Typography>
          <Stack spacing={3}>
            <TextField
              fullWidth
              autoComplete="tên sản phẩm"
              placeholder="tên sản phẩm"
              value={bodyProductByID.n}
              name="n"
              onChange={handleChangeData}
            />

            <Box style={{ display: 'flex', justifyContent: 'center' }}>
              <TextField
                style={{ marginRight: '20px' }}
                placeholder="số lượng size S"
                value={bodyProductByID.ss}
                name="ss"
                onChange={handleChangeData}
              />
              <TextField
                style={{ marginRight: '20px' }}
                placeholder="số lượng size M"
                value={bodyProductByID.sm}
                name="sm"
                onChange={handleChangeData}
              />
              <TextField
                placeholder="số lượng size L"
                value={bodyProductByID.sl}
                name="sl"
                onChange={handleChangeData}
              />
            </Box>
            <TextField
              required
              placeholder="mô tả sản phẩm"
              value={bodyProductByID.des}
              name="des"
              onChange={handleChangeData}
            />
            <Box style={{ display: 'flex', justifyContent: 'center' }}>
              <TextField
                fullWidth
                style={{ marginRight: '20px' }}
                placeholder="giá tiền"
                value={bodyProductByID.p}
                name="p"
                onChange={handleChangeData}
              />
              <TextField
                fullWidth
                style={{ marginRight: '20px' }}
                placeholder="discount"
                value={bodyProductByID.d}
                name="d"
                onChange={handleChangeData}
              />
              <TextField
                fullWidth
                placeholder="categories"
                value={bodyProductByID.c}
                name="c"
                onChange={handleChangeData}
              />
            </Box>
            <ImageUploading multiple onChange={onChange} maxNumber="1" dataURLKey="data_url">
              {({ onImageUpload }) => <button onClick={onImageUpload}>Click or Drop here</button>}
            </ImageUploading>

            {/* <button onClick={this.onFileUpload}>
                  Upload!
                </button> */}
          </Stack>

          <LoadingButton
            style={{ marginTop: '20px' }}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            onClick={handleAddProduc}
          >
            Lưu sản phẩm
          </LoadingButton>
        </Form>
      </FormikProvider>
      <SectionStyle>
        <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
          Manage the job more effectively with Minimal
        </Typography>
        <img alt="register" src="/static/illustrations/illustration_register.png" />
      </SectionStyle>
    </Box>
  );
}
