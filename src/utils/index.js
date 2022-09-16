import { saveAs } from "file-saver";
import { DATE_FORMATS } from "./constants";

export const appendZeroToTime = number => {
  if (number >= 0 && number < 10) {
    return `0${number}`;
  }
  return number;
};

export const formatDate = (isoDateString, type) => {
  if (!isoDateString) {
    return "-";
  }
  try {
    const dateObj = new Date(isoDateString);
    if (Number.isNaN(dateObj.getTime())) {
      return "-";
    }
    switch (type) {
      case "dateString":
        return isoDateString === "" ? "-" : dateObj.toLocaleDateString();
      case "timeString":
        return dateObj.toLocaleTimeString();
      case DATE_FORMATS["YYYY-MM-DD"]: {
        const date = new Date(dateObj);
        const month = `${appendZeroToTime(date.getMonth() + 1)}`;
        const monthDisplay = `${month.slice(-2)}`;
        const day = `${appendZeroToTime(date.getDate())}`;
        const dayDisplay = `${day.slice(-2)}`;
        return [date.getFullYear(), monthDisplay, dayDisplay].join("-");
      }
      case DATE_FORMATS["DD-MM-YYYY"]: {
        const date = new Date(dateObj);
        const month = `${appendZeroToTime(date.getMonth() + 1)}`;
        const monthDisplay = `${month.slice(-2)}`;
        const day = `${appendZeroToTime(date.getDate())}`;
        const dayDisplay = `${day.slice(-2)}`;
        return [dayDisplay, monthDisplay, date.getFullYear()].join("-");
      }
      default:
        return `${dateObj.toLocaleDateString()} 
                  ${dateObj.toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true
                  })}`;
    }
  } catch (err) {
    return "Invalid Date";
  }
};

export const convertCamelCaseToDisplayText = txt => {
  let strTmp = txt.replace(/([a-z])([A-Z])/g, "$1 $2");
  if (strTmp && strTmp.length > 0) {
    strTmp = `${strTmp[0].toUpperCase()}${strTmp.slice(1)}`;
  }
  return strTmp;
};

export const convertToCamelCaseFromUnderScore = str => {
  return convertCamelCaseToDisplayText(
    (str || "").toLowerCase().replace(/_+([a-z])/g, (m, w) => w.toUpperCase())
  );
};

export const removeUnderScore = value => {
  if (!value || !value.includes("_")) {
    return value;
  }
  return value.split("_").join(" ");
};

const EXCEL_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const EXCEL_EXTENSION = ".xlsx";

export const exportToExcel = (data, name) => {
  const ws = window.XLS.utils.json_to_sheet(data);
  const wb = {
    Sheets: {
      data: ws
    },
    SheetNames: ["data"]
  };

  const eb = window.XLS.write(wb, { bookType: "xlsx", type: "array" });
  const blob = new Blob([eb], { type: EXCEL_TYPE });
  saveAs(blob, "file_" + name + EXCEL_EXTENSION);
};
