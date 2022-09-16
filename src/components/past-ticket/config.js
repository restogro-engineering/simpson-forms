export const HeaderConfig = [
  {
    label: "Ticket ID",
    key: "id",
    onClick: true,
    render: (data, onClick) => {
      return (
        <span className='clickable' onClick={() => onClick(data)}>
          {data.id.substr(0, 8)}
        </span>
      );
    }
  },
  {
    label: "Created On",
    key: "createdAt",
    render: data => {
      return (
        <span>
          {data.createdAt && new Date(data.createdAt).toLocaleDateString()}{" "}
          {data.createdAt && new Date(data.createdAt).toLocaleTimeString()}
        </span>
      );
    }
  },
  {
    label: "Service Engineer",
    key: "serviceEngineer",
    render: data => {
      return <span>{data.serviceEngineer || "Not assigned"}</span>;
    }
  },
  {
    label: "Status",
    key: "status"
  }
];

export const SERVICE_LABEL_MAP = {
  firstService: "1st Service",
  secondService: "2nd Service",
  thirdService: "3rd Service",
  fourthService: "4th Service"
};
