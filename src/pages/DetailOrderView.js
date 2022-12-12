import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Box } from '@mui/material';

import Typography from '@mui/material/Typography';

export default function SimpleDialog(props) {
  const { onClose, selectedValue, open, itemProp } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const renderPaymentStatus = (status) => {
    switch (status) {
      case '0': {
        return 'Chưa thanh toán';
      }
      case '1': {
        return 'Đã thanh toán';
      }
      default:
        return 'ERROR!!!';
    }
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>CHI TIẾT ĐƠN HÀNG</DialogTitle>

      <Box style={{ padding: '20px' }}>
        {
          itemProp?.shopOrderID !== undefined &&
          <Box style={{ display: 'flex', marginBottom: '10px' }}>
            <Typography style={{ fontWeight: 600 }}>Mã đơn hàng</Typography>
            <Typography style={{ marginLeft: '60px' }}>{itemProp?.shopOrderID}</Typography>
          </Box>
        }
        {
          itemProp?.shopName !== undefined &&
          <Box style={{ display: 'flex', marginBottom: '10px' }}>
            <Typography style={{ fontWeight: 600 }}>Tên cửa hàng</Typography>
            <Typography style={{ marginLeft: '57px' }}>{itemProp?.shopName}</Typography>
          </Box>
        }
        {
          itemProp?.shopKeeperName !== undefined &&
          <Box style={{ display: 'flex', marginBottom: '10px' }}>
            <Typography style={{ fontWeight: 600 }}>Chủ cửa hàng</Typography>
            <Typography style={{ marginLeft: '55px' }}>{itemProp?.shopKeeperName}</Typography>
          </Box>

        }
        {
          itemProp?.shopAddress !== undefined &&
          <Box style={{ display: 'flex', marginBottom: '10px' }}>
            <Typography style={{ fontWeight: 600 }}>Địa chỉ cửa hàng</Typography>
            <Typography style={{ marginLeft: '80px' }}>{itemProp?.shopAddress}</Typography>
          </Box>
        }
        {
          itemProp?.shopPhone !== undefined &&
          <Box style={{ display: 'flex', marginBottom: '10px' }}>
            <Typography style={{ fontWeight: 600 }}>SĐT cửa hàng</Typography>
            <Typography style={{ marginLeft: '54px' }}>{itemProp?.shopPhone}</Typography>
          </Box>
        }
        {
          itemProp?.shopEmail !== undefined &&
          <Box style={{ display: 'flex', marginBottom: '10px' }}>
            <Typography style={{ fontWeight: 600 }}>Email cửa hàng</Typography>
            <Typography style={{ marginLeft: '44px' }}>{itemProp?.shopEmail}</Typography>
          </Box>
        }
        {
          itemProp?.packageName !== undefined &&
          <Box style={{ display: 'flex', marginBottom: '10px' }}>
            <Typography style={{ fontWeight: 600 }}>Tên món hàng</Typography>
            <Typography style={{ marginLeft: '81px' }}>{itemProp?.packageName}</Typography>
          </Box>
        }
        {
          itemProp?.registerDate !== undefined &&
          <Box style={{ display: 'flex', marginBottom: '10px' }}>
            <Typography style={{ fontWeight: 600 }}>Ngày gửi đơn</Typography>
            <Typography style={{ marginLeft: '60px' }}>{itemProp?.registerDate}</Typography>
          </Box>
        }
        {
          itemProp?.mass !== undefined &&
          <Box style={{ display: 'flex', marginBottom: '10px' }}>
            <Typography style={{ fontWeight: 600 }}>Khối lượng</Typography>
            <Typography style={{ marginLeft: '75px' }}>{itemProp?.mass} Kg</Typography>
          </Box>
        }
        {
          itemProp?.quantity !== undefined &&
          <Box style={{ display: 'flex', marginBottom: '10px' }}>
            <Typography style={{ fontWeight: 600 }}>Số lượng</Typography>
            <Typography style={{ marginLeft: '89px' }}>{itemProp?.quantity}</Typography>
          </Box>
        }
        {
          itemProp?.unitPrice !== undefined &&
          <Box style={{ display: 'flex', marginBottom: '10px' }}>
            <Typography style={{ fontWeight: 600 }}>Đơn giá sản phẩm</Typography>
            <Typography style={{ marginLeft: '25px' }}>{itemProp?.unitPrice} ₫</Typography>
          </Box>
        }
        {
          itemProp?.shippingFee !== undefined &&
          <Box style={{ display: 'flex', marginBottom: '10px' }}>
            <Typography style={{ fontWeight: 600 }}>Phí vận chuyển</Typography>
            <Typography style={{ marginLeft: '47px' }}>{itemProp?.shippingFee} ₫</Typography>
          </Box>
        }
        {
          itemProp?.totalPrice !== undefined &&
          <Box style={{ display: 'flex', marginBottom: '10px' }}>
            <Typography style={{ fontWeight: 600 }}>Tổng tiền</Typography>
            <Typography style={{ marginLeft: '89px' }}>{itemProp?.totalPrice} ₫</Typography>
          </Box>
        }
        {
          itemProp?.consigneeName !== undefined &&
          <Box style={{ display: 'flex', marginBottom: '10px' }}>
            <Typography style={{ fontWeight: 600 }}>Người nhận</Typography>
            <Typography style={{ marginLeft: '72px' }}>{itemProp?.consigneeName}</Typography>
          </Box>
        }
        {
          itemProp?.consigneePhone !== undefined &&
          <Box style={{ display: 'flex', marginBottom: '10px' }}>
            <Typography style={{ fontWeight: 600 }}>SĐT người nhận</Typography>
            <Typography style={{ marginLeft: '39px' }}>{itemProp?.consigneePhone}</Typography>
          </Box>
        }
        {
          itemProp?.consignneNote !== undefined &&
          <Box style={{ display: 'flex', marginBottom: '10px' }}>
            <Typography style={{ fontWeight: 600 }}>Ghi chú</Typography>
            <Typography style={{ marginLeft: '128px' }}>{itemProp?.consignneNote}</Typography>
          </Box>
        }
        {
          itemProp?.deliveryAddress !== undefined &&
          <Box style={{ display: 'flex', marginBottom: '10px' }}>
            <Typography style={{ fontWeight: 600 }}>Địa chỉ giao</Typography>
            <Typography style={{ marginLeft: '74px' }}>{itemProp?.deliveryAddress}</Typography>
          </Box>
        }
        {
          itemProp?.shippingFeePayment !== undefined &&
          <Box style={{ display: 'flex', marginBottom: '10px' }}>
            <Typography style={{ fontWeight: 600 }}>Thanh toán phí vận chuyển</Typography>
            <Typography style={{ marginLeft: '30px' }}>{renderPaymentStatus(itemProp?.shippingFeePayment)}</Typography>
          </Box>
        }
        {
          itemProp?.fullPayment !== undefined &&
          <Box style={{ display: 'flex', marginBottom: '10px' }}>
            <Typography style={{ fontWeight: 600 }}>Thanh toán toàn bộ đơn</Typography>
            <Typography style={{ marginLeft: '53px' }}>{renderPaymentStatus(itemProp?.fullPayment)}</Typography>
          </Box>
        }
      </Box>
    </Dialog>
  );
}

// SimpleDialog.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   open: PropTypes.bool.isRequired,
//   selectedValue: PropTypes.string.isRequired,
// };

// export default function SimpleDialogDemo() {
//   const [open, setOpen] = React.useState(false);
//   const [selectedValue, setSelectedValue] = React.useState(itemProp[1]);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = (value) => {
//     setOpen(false);
//     setSelectedValue(value);
//   };

//   return (
//     <div>
//       <br />
//       <Button variant="outlined" onClick={handleClickOpen}>
//         Open simple dialog
//       </Button>
//       <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
//     </div>
//   );
// }
