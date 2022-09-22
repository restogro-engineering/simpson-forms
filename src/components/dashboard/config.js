/** @format */

import DownloadIcon from '@mui/icons-material/Download';
import { IconButton } from '@mui/material';

export const HeaderConfig = [
  {
    label: 'Ticket ID',
    key: 'id',
    onClick: true,
    render: (data, onClick) => {
      return (
        <span className='clickable' onClick={() => onClick(data,'ID')}>
          {data.id}
        </span>
      );
    },
  },
  {
    label: 'Status',
    key: 'status',
  },
  {
    label: 'Assigned To',
    key: 'assignedTo',
  },
  {
    label: 'Submitted Date',
    key: 'submittedDate',
  },
  {
    label: 'Comments',
    key: 'comments',
    render: (data, onClick) => {
      return (
        <span className='clickable' onClick={() => onClick(data)}>
          comments({data?.comments?.length})
        </span>
      );
    },
  }
];

// this is for dashbaord execl header
export const formatData = (items) => {
  return (items || []).map((item) => {
    return {
      id: item.id,
      Code: item.code,
      Name: item.name,
      'Raw Material Cost': item.rmc,
      'Gross Margin': item.gm,
      'Gross Margin Percentage': item.gmp,
      'Net Gross Margin': item.netGm,
      'Net Gross Margin Percentage': item.netGmP,
      'Date of Insert': item.dateOfInsert,
    };
  });
};

export const getDashboardUploadCOnfig = (
  rmFileNames,
  premixFileNames,
  bomFileNames,
  salesFiles
) => [
  {
    label: 'File Name',
    name: 'fileName',
    type: 'text',
  },
  {
    label: 'RM File name',
    name: 'rmFile',
    type: 'dropdown',
    options: rmFileNames,
  },
  {
    label: 'Premix File',
    name: 'premixFile',
    type: 'dropdown',
    options: premixFileNames,
  },
  {
    label: 'Bom File Name',
    name: 'bomFile',
    type: 'dropdown',
    options: bomFileNames,
  },
  {
    label: 'Sales File Name',
    name: 'salesFile',
    type: 'dropdown',
    options: salesFiles,
  },
];
