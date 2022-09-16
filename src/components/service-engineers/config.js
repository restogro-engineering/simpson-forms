import ActionIcons from "../actionIcons";
export const getHeaderConfig = (loadData) => [
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
        <ActionIcons
          type={data.role}
          loadData={loadData}
          id={data.id}
          name={data.name}
          email={data.email}
        />
      );
    },
  },
];
export const getMobileHeaderConfig = () => [
  {
    label: "Name",
    key: "name",
  },
  {
    label: "Email",
    key: "email",
  },
];
