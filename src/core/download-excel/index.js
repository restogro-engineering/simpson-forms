/** @format */

import { Button } from '@mui/material';
import { saveAs } from 'file-saver';

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

const DownloadExcel = ({ data, title, name }) => {
  const exportToExcel = () => {
    const ws = window.XLS.utils.json_to_sheet(data);
    const wb = {
      Sheets: {
        data: ws,
      },
      SheetNames: ['data'],
    };

    const eb = window.XLS.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([eb], { type: EXCEL_TYPE });
    saveAs(blob, name + EXCEL_EXTENSION);
  };

  return (
    <div>
      <Button        
        variant='outlined'
        color='primary'
        onClick={exportToExcel}
      >
        {title}
      </Button>
    </div>
  );
};

export default DownloadExcel;
