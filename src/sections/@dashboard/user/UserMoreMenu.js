import { useRef, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
import axios from 'axios';
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

export default function UserMoreMenu({ id }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    async function deleteProduct() {
      const res = await axios.delete(`http://localhost:3000/api/v1/products/${id}`);
      if (res.data.acknowledged === true) {
        navigate('/dashboard/products');
      }
    }
    deleteProduct();
  };
  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Delete"
            onClick={() => handleDelete(id)}
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </MenuItem>

        <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Edit"
            onClick={() => navigate(`/dashboard/updateProduct?id=${id}`)}
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </MenuItem>
      </Menu>
    </>
  );
}
