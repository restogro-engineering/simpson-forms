import ActionIcons from "../actionIcons";
export const getHeaderConfig = (loadData) => [
  {
    label: "Email",
    key: "email",
  },
  {
    label: "Actions",
    key: "actions",
    render: (data) => {
      return (
        <ActionIcons loadData={loadData} type="mailing list" id={data.id} />
      );
    },
  },
];
