export const HeaderConfig = [
  {
    label: 'Ticket ID',
    key: 'id',
    onClick: true,
    render: (data, onClick) => {
      return (
        <span className="clickable" onClick={() => onClick(data)}>
          {data.id}
        </span>
      );
    },
  },
  {
    label: 'Status',
    key: 'status',
  },
  {
    label: 'Submitted Date',
    key: 'submittedDate',
  },
  {
    label: 'Comments',
    key: 'comments',
    render: (data, onClick) => {
      return (
        <span className="clickable" onClick={() => onClick(data)}>
          comments({data.comments.length})
        </span>
      );
    },
  },
];

export const SERVICE_LABEL_MAP = {
  firstService: '1st Service',
  secondService: '2nd Service',
  thirdService: '3rd Service',
  fourthService: '4th Service',
};
