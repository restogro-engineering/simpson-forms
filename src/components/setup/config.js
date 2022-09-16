/** @format */

export const PremixHeaderConfig = [
  {
    label: "Recipe Id",
    key: "recipeId",
  },
  {
    label: "Name",
    key: "name",
  },
  {
    label: "Price per unit",
    key: "pricePerUnit",
    render: (data) => {
      return `${parseFloat(data.pricePerLowestUnit).toFixed(2)} / ${
        data.lowestUnit
      }`;
    },
  },
  {
    label: "Items",
    key: "city",
    render: (data, onClick) => {
      return (
        <span className="clickable" onClick={() => onClick(data)}>
          {data.itemList?.length}
        </span>
      );
    },
  },
];

export const RecipesHeaderConfig = [
  {
    label: "Recipe Id",
    key: "recipeId",
  },
  {
    label: "Name",
    key: "name",
  },
  {
    label: "Price per unit",
    key: "pricePerUnit",
    render: (data) => {
      return `${parseFloat(data.pricePerUnit).toFixed(2)}`;
    },
  },
  {
    label: "Items",
    key: "city",
    render: (data, onClick) => {
      return (
        <span className="clickable" onClick={() => onClick(data)}>
          {data.itemList?.length}
        </span>
      );
    },
  },
];

export const ItemsHeaderConfig = [
  {
    label: "Code",
    key: "code",
  },
  {
    label: "Category",
    key: "category",
  },
  {
    label: "Name",
    key: "name",
  },
  {
    label: "Date Of Insert",
    key: "dateOfInsert",
  },
  {
    label: "Price per unit",
    key: "pricePerUnit",
    render: (data) => {
      return `${parseFloat(data.pricePerUnit).toFixed(2)} / ${data.baseUnit}`;
    },
  },
];

export const PremixItemListConfig = [
  {
    label: "Code",
    key: "itemCode",
  },
  {
    label: "Name",
    key: "itemName",
  },
  {
    label: "Price per unit",
    key: "pricePerUnit",
    render: (data) => {
      return `${parseFloat(data.pricePerUnit).toFixed(2)}`;
    },
  },
  {
    label: "Quantity",
    key: "qty",
  },
  {
    label: "Unit",
    key: "itemBaseUnit",
  },
];

export const RecipesItemsListConfig = [
  {
    label: "Item Id",
    key: "itemId",
  },
  {
    label: "Name",
    key: "name",
  },
  {
    label: "Price",
    key: "price",
    render: (data) => {
      return `${parseFloat(data.price).toFixed(2)} / ${
        data.itemBaseUnit || ""
      }`;
    },
  },
  {
    label: "Quantity",
    key: "qty",
  },
  {
    label: "Unit",
    key: "uom",
  },
];

// this is for recipe and premix  execl header
export const formatData = (data) => {
  let updatedItems = [];
  (data || []).forEach((dataItem) => {
    const { itemList } = dataItem;
    if (itemList && itemList.length > 0) {
      itemList.forEach((item) => {
        const t = {
          ...item,
          ...dataItem,
        };
        delete t.itemList;
        delete t.id;
        updatedItems.push(t);
      });
    }
  });

  return updatedItems;
};

/** @format */

export const HeaderConfig = [
  {
    label: "Code",
    key: "code",
  },
  {
    label: "Name",
    key: "name",
  },
  {
    label: "Raw Material Cost",
    key: "rmc",
    render: (data) => {
      return <span key={data.rmc}>{`${parseFloat(data.rmc).toFixed(2)}`}</span>;
    },
  },
  {
    label: "Gross Margin",
    key: "gm",
    render: (data) => {
      return <span key={data.gm}>{`${parseFloat(data.gm).toFixed(2)}`}</span>;
    },
  },
  {
    label: "Gross Margin (%)",
    key: "gmp",
    render: (data) => {
      return <span key={data.gmp}>{`${parseFloat(data.gmp).toFixed(2)}`}</span>;
    },
  },
  {
    label: "Net Gross Margin",
    key: "netGm",
    render: (data) => {
      return (
        <span key={data.netGm}>{`${parseFloat(data.netGm).toFixed(2)}`}</span>
      );
    },
  },
  {
    label: "Net Gross Margin (%)",
    key: "netGmP",
    render: (data) => {
      return (
        <span key={data.netGmP}>{`${parseFloat(data.netGmP).toFixed(2)}`}</span>
      );
    },
  },
  {
    label: "Net Selling Price",
    key: "nsp",
    render: (data) => {
      return <span key={data.nsp}>{`${parseFloat(data.nsp).toFixed(2)}`}</span>;
    },
  },
  {
    label: "Discount (%)",
    key: "disc",
    render: (data) => {
      return (
        <span key={data.disc}>{`${parseFloat(data.disc).toFixed(2)}`}</span>
      );
    },
  },
];

// this is for sales  execl header
export const formatSalesData = (items) => {
  return (items || []).map((item) => {
    return {
      id: item.id,
      Code: item.code,
      Name: item.name,
      NSP: item.nsp,
      "Disc %": (item.disc * 100).toFixed(2),
      // 'Raw Material Cost': item.rmc,
      // 'Gross Margin': item.gm,
      // 'Gross Margin Percentage': item.gmp,
      // 'Net Gross Margin': item.netGm,
      // 'Net Gross Margin Percentage': item.netGmP,
      // 'Date of Insert': item.dateOfInsert,
    };
  });
};

export const getPremixUploadCOnfig = (itemFileNames) => [
  {
    label: "File Name",
    name: "fileName",
    type: "text",
  },
  {
    label: "Item File Name",
    name: "itemFileName",
    type: "dropdown",
    options: itemFileNames,
  },
];

export const getRecipeUploadCOnfig = (premixFileName) => [
  {
    label: "File Name",
    name: "fileName",
    type: "text",
  },
  {
    label: "Premix File Name",
    name: "premixFileName",
    type: "dropdown",
    options: premixFileName,
  },
];

export const getItemUploadCOnfig = () => [
  {
    label: "File Name",
    name: "fileName",
    type: "text",
  },
];

export const getDashboardUploadCOnfig = (premixFileName) => [
  {
    label: "File Name",
    name: "fileName",
    type: "text",
  },
  {
    label: "Bom File Name",
    name: "bomFileName",
    type: "dropdown",
    options: premixFileName,
  },
];
