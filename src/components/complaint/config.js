import ActionIcons from "../actionIcons";
export const getHeaderConfig = (loadData, filters) => [
  {
    label: "Code",
    key: "code",
  },
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
          loadData={loadData}
          filters={filters}
          type="complaint"
          id={data.id}
          Code={data.code}
          Description={data.description}
        />
      );
    },
  },
];
