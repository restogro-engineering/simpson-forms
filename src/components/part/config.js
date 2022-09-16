import ActionIcons from "../actionIcons";
export const getHeaderConfig = (loadData) => [
  {
    label: "Description",
    key: "description",
  },
  {
    label: "Actions",
    key: "actions",
    render: (data) => {
      return (
        <ActionIcons
          type="part"
          loadData={loadData}
          id={data.id}
          Description={data.description}
        />
      );
    },
  },
];