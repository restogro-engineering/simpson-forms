/** @format */
import { saveAs } from 'file-saver';

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

export const exportToExcel = (data, name, sheetName = 'data') => {
  const tmpdata = data.map((r) => {
    delete r.id;
    delete r.archive;
    return r;
  });

  const ws = window.XLS.utils.json_to_sheet(tmpdata);
  const wb = {
    Sheets: {
      [sheetName]: ws,
    },
    SheetNames: [sheetName],
  };

  const eb = window.XLS.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([eb], { type: EXCEL_TYPE });
  saveAs(blob, 'file_' + name + EXCEL_EXTENSION);
};

export const debounce = (func, timeout = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};
