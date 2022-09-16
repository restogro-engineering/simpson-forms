/** @format */

import React from 'react';
import SiTable from '../../../core/table';
import { Box, IconButton, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ItemList = ({ items, onClose, config }) => {
  return (
    <Modal open={true}>
      <Box sx={style}>
        <div className='items-list-container'>
          <div className='close-icon'>
            <IconButton size='large' onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <SiTable
            header={config}
            data={items || []}
            pageCount={0}
          ></SiTable>
        </div>
      </Box>
    </Modal>
  );
};

export default ItemList;
