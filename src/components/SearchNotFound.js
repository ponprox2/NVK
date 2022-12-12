import PropTypes from 'prop-types';
// material
import { Paper, Typography } from '@mui/material';

// ----------------------------------------------------------------------

SearchNotFound.propTypes = {
  searchQuery: PropTypes.string,
};

export default function SearchNotFound({ searchQuery = '', ...other }) {
  return (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        Thông báo
      </Typography>
      <Typography variant="body2" align="center">
        Hiện tại <strong>chưa có</strong> đơn hàng nào cần thao tác ở mục tìm kiếm này
      </Typography>
    </Paper>
  );
}
