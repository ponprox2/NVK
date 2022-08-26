import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { styled } from '@mui/material/styles';
import axios from 'axios';

import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Box,
  Typography,
  Card,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import ImageUploading from 'react-images-uploading';
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

export default function UpdProduct() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [productByID, setProductByID] = useState([]);
  const [images, setImages] = useState([]);

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
  const id = search.split('=')[1];

  const [showPassword, setShowPassword] = useState(false);

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

  async function getProductDetail() {
    const res = await axios.get(`http://localhost:3000/api/v1/products/${id}`);

    setProductByID(res.data[0]);
    setBodyProductByID({
      n: res.data[0].name,
      p: res.data[0].price,
      ss: res.data[0].stock[0].available,
      sm: res.data[0].stock[1].available,
      sl: res.data[0].stock[2].available,
      d: res.data[0].discount,
      c: res.data[0].category,
      des: res.data[0].description,
      bs64: res.data[0].link_image,
    });
  }
  useEffect(() => {
    getProductDetail();
  }, []);

  const handleChangeData = (e) => {
    const { name, value } = e.target;

    setBodyProductByID((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const onChange = (imageList, addUpdateIndex) => {
    const ArrBS64 = imageList[0].data_url;
    setBodyProductByID((prevState) => ({
      ...prevState,
      bs64: ArrBS64,
    }));
  };

  const handleUpdate = () => {
    async function updateProduct() {
      const res = await axios.put(`http://localhost:3000/api/v1/products/${id}`, bodyProductByID);
      if (res.data.matchedCount === 1) {
        navigate('/dashboard/products');
      }
    }
    updateProduct();
  };
  const handleDelete = () =>{
    async function deleteProduct() {
        const res = await axios.delete(`http://localhost:3000/api/v1/products/${id}`);
        if (res.data.acknowledged === true) {
          navigate('/dashboard/products');
        }
      }
      deleteProduct();
  }
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
                label="số lượng size S"
                value={bodyProductByID.ss}
                name="ss"
                onChange={handleChangeData}
              />
              <TextField
                style={{ marginRight: '20px' }}
                label="số lượng size M"
                value={bodyProductByID.sm}
                name="sm"
                onChange={handleChangeData}
              />
              <TextField label="số lượng size L" value={bodyProductByID.sl} name="sl" onChange={handleChangeData} />
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
                placeholder="discount"
                value={bodyProductByID.d}
                name="d"
                onChange={handleChangeData}
              />
            </Box>
            <Box>
              <ImageUploading multiple onChange={onChange} maxNumber="1" dataURLKey="data_url">
                {({ onImageUpload }) => <button onClick={onImageUpload}>Click or Drop here</button>}
              </ImageUploading>
            </Box>
          </Stack>
          <Box style={{ display: 'flex', justifyContent: 'center' }}>
            <LoadingButton
              style={{ marginTop: '20px', marginRight: '30px' }}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              // loading={isSubmitting}

              onClick={handleUpdate}
            >
              Lưu sản phẩm
            </LoadingButton>
            <LoadingButton
              style={{ marginTop: '20px' }}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              // loading={isSubmitting}

              onClick={handleDelete}
            >
              xoá sản phẩm
            </LoadingButton>
          </Box>
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
