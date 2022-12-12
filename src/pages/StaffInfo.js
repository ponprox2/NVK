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

function StaffInfo() {
  const account = JSON.parse(localStorage.getItem("accountData") || "[]");

  return (
    <>
      <Box>
        <Box style={{ margin: '20px 0px 50px 30px' }}> </Box>
        <Box style={{ width: '90%', margin: '0 auto', display: 'flex', justifyContent: 'space-between' }}>
          <Box width="90%">
            <h2 style={{ lineHeight: '30px' }}>Thông Tin Cá Nhân</h2>
            <Divider />
            <Box style={{ display: 'flex', marginBottom: '30px' }}> </Box>
            {
              account?.staffID !== undefined &&
              <Typography style={{ lineHeight: '30px' }}>Mã nhân viên : {account?.staffID}</Typography>
            }
            {
              account?.citizenID !== undefined &&
              <Typography style={{ lineHeight: '30px' }}>CMND/CCCD : {account?.citizenID}</Typography>
            }
            {
              account?.name !== undefined &&
              <Typography style={{ lineHeight: '30px' }}>Họ và tên : {account?.name}</Typography>
            }
            {
              account?.gender !== undefined &&
              <Typography style={{ lineHeight: '30px' }}>Giới tính : {account?.gender}</Typography>
            }
            {
              account?.phone !== undefined &&
              <Typography style={{ lineHeight: '30px' }}>SĐT : {account?.phone}</Typography>
            }
            {
              account?.email !== undefined &&
              <Typography style={{ lineHeight: '30px' }}>Email : {account?.email}</Typography>
            }
            {
              account?.address !== undefined &&
              <Typography style={{ lineHeight: '30px' }}>Địa chỉ cư trú : {account?.address}</Typography>
            }
            {
              account?.workingTerritory !== undefined &&
              <Typography style={{ lineHeight: '30px' }}>Khu vực làm việc: {account?.workingTerritory}</Typography>
            }
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default StaffInfo;
