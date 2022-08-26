// import { filter } from 'lodash';
// import { sentenceCase } from 'change-case';
// import { useState, useEffect } from 'react';
// import { Link as RouterLink, useLocation } from 'react-router-dom';
// // material
// import {
//   Card,
//   Table,
//   Stack,
//   Avatar,
//   Button,
//   Checkbox,
//   TableRow,
//   TableBody,
//   TableCell,
//   Container,
//   Typography,
//   TableContainer,
//   TablePagination,
//   Box,
//   Divider,
// } from '@mui/material';
// // components
// import axios from 'axios';
// import Page from '../components/Page';
// import Label from '../components/Label';
// import Scrollbar from '../components/Scrollbar';
// import Iconify from '../components/Iconify';
// import SearchNotFound from '../components/SearchNotFound';
// import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';

// function tableProduct({ id }) {
//   const [linkImage, setLinkImage] = useState('');
//   useEffect(() => {
//     async function getImageProduct(id) {
//       const res = await getImage.getImageByID(id);
// //
//       setLinkImage(res.data.image);
//     }
//     getImageProduct(id);
//   }, []);

//   return (
//     <TableRow
//       hover
//       // key={id}
//       tabIndex={-1}
//       role="checkbox"
//       // selected={isItemSelected}
//       // aria-checked={isItemSelected}
//     >
//       <TableCell padding="checkbox">
//         <Checkbox />
//       </TableCell>

//       <TableCell align="left">{value.name}</TableCell>
//       <TableCell align="left">1</TableCell>
//       <TableCell align="left">1</TableCell>
//       <TableCell align="left">1</TableCell>
//       <TableCell align="left">1</TableCell>
//     </TableRow>
//   );
// }

// export default TableProduct;
