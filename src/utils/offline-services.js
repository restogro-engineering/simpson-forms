export const setOfflineData = (key, data) => {
    if (data !== "" && data !== null && data !== undefined) {
      localStorage.setItem(`subway:${key}`, JSON.stringify(data));
    }
  };
  
  export const getOfflineData = key => {
    const data = localStorage.getItem(`subway:${key}`);
    if (data !== "" && data !== null && data !== undefined) {
      return JSON.parse(data);
    } else {
      return "";
    }
  };
  
  export const clearOffllineData = key => {
    localStorage.removeItem(`subway:${key}`);
  };
  
  export const clearSpidleOfflineData = startsWith => {
    let myLength = startsWith.length;
    Object.keys(localStorage).forEach(function(key) {
      if (key.substring(0, myLength) === startsWith) {
        localStorage.removeItem(key);
      }
    });
  };
