import OemActionIcons from "./OemActionIcon";
export const getHeaderConfig = (loadData) => [
  {
    label: "Code",
    key: "code",
  },
  {
    label: "Name",
    key: "name",
  },
  {
    label: "Email",
    key: "email",
  },
  {
    label: "Address",
    key: "address",
    render: (data) => {
      return data.address.line1;
    },
  },
  {
    label: "Actions",
    key: "actions",
    render: (data) => {
      return (
        <OemActionIcons
          id={data.id}
          LoadData={loadData}
          Code={data.code}
          Name={data.name}
          Address={data.address}
          Industry={data.industry}
        />
      );
    },
  },
];
export const getMobileHeaderConfig = (loadData) => [
  {
    label: "Name",
    key: "name",
  },
  {
    label: "Email",
    key: "email",
  },
  {
    label: "Actions",
    key: "actions",
    render: (data) => {
      return (
        <OemActionIcons
          id={data.id}
          LoadData={loadData}
          Code={data.code}
          Name={data.name}
          Address={data.address}
          Industry={data.industry}
        />
      );
    },
  },
];
