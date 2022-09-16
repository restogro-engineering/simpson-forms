/** @format */

import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
export const getHeaderConfig = (loadData, onEdit) => [
  {
    label: 'Name',
    key: 'name',
  },
  {
    label: 'Actions',
    key: 'actions',
    render: (data) => {
      return (
        <IconButton onClick={() => onEdit(data)} id='delete' onCL sx={{ p: 0 }}>
          <DeleteIcon />
        </IconButton>
      );
    },
  },
];
