/** @format */

export const REPORT_TABS = ['Tickets', 'Service Engineer', 'OEM'];
export const OEM_REPORT_OPTIONS = [
  { label: 'Agricultural', value: 'AGRICULTURAL_OEM_WISE' },
  { label: 'Industrial', value: 'INDUSTRIAL_OEM_WISE' },
  { label: 'Created by OEM', value: 'OEM_WISE' },
];
export const TICKET_REPORT_STATUS = [
  {
    label: 'Open Tickets',
    value: 'OPEN_TICKETS',
    filterPayload: {
      status: 'OPEN_TICKETS',
    },
  },
  {
    label: 'Closed Tickets',
    value: 'CLOSED_TICKETS',
    filterPayload: {
      status: 'CLOSED_TICKETS',
    },
  },
  {
    label: 'Unresolved Tickets',
    value: 'UNRESOLVED_TICKETS',
    filterPayload: {
      status: 'UNRESOLVED_TICKETS',
    },
  },
  {
    label: 'Reopened Tickets',
    value: 'REOPENED_TICKETS',
    filterPayload: {
      status: 'REOPENED_TICKETS',
    },
  },
  {
    label: 'Resolved Tickets',
    value: 'RESOLVED_TICKETS',
    filterPayload: {
      status: 'RESOLVED_TICKETS',
    },
  },
  {
    label: 'Parts Replacement Suggested',
    value: 'PARTS_REPLACEMENT_SUGGESTED',
    filterPayload: {
      status: 'PARTS_REPLACEMENT_SUGGESTED',
    },
  },
  {
    label: 'Engine Replacement Suggested',
    value: 'ENGINE_REPLACEMENT_SUGGESTED',
    filterPayload: {
      status: 'ENGINE_REPLACEMENT_SUGGESTED',
    },
  },
  {
    label: 'Under Warranty',
    value: 'UNDER_WARRANTY',
    filterPayload: {
      status: 'UNDER_WARRANTY',
    },
  },

  {
    label: 'Not Under Warranty',
    value: 'NOT_UNDER_WARRANTY',
    filterPayload: {
      status: 'NOT_UNDER_WARRANTY',
    },
  },
  {
    label: 'Part Causing Failure Wise',
    value: 'PART_CAUSING_FAILURE_WISE',
    nextDropDownLabel: 'Part',
    filterPayload: {
      status: 'PART_CAUSING_FAILURE_WISE',
      others: {
        part: 'part1',
      },
    },
  },
  {
    label: 'List Number Wise',
    value: 'LIST_NUMBER_WISE',
    nextDropDownLabel: 'List number',
    filterPayload: {
      status: 'LIST_NUMBER_WISE',
      others: {
        listNumber: 'list1',
      },
    },
  },
  {
    label: 'Model Wise',
    value: 'MODEL_WISE',
    nextDropDownLabel: 'Engine Model',
    filterPayload: {
      status: 'MODEL_WISE',
      others: {
        engineModal: 'emod1',
      },
    },
  },
  {
    label: 'Customer Complaint Wise',
    value: 'CUSTOMER_COMPLAINT_WISE',
    nextDropDownLabel: 'Customer Complaint Code',
    filterPayload: {
      status: 'CUSTOMER_COMPLAINT_WISE',
      others: {
        customerComplaintCode: 'code1',
      },
    },
  },
  {
    label: 'HMR Wise',
    value: 'HMR_WISE',
    nextDropDownLabel: 'HMR',
    filterPayload: {
      status: 'HMR_WISE',
      others: {
        hmr: 123,
      },
    },
  },
];

export const getHeaderConfig = () => [
  {
    label: 'Ticket ID',
    key: 'id',
    onClick: true,
    render: (data, onClick) => {
      return (
        <span className='clickable' onClick={() => onClick(data)}>
          {data.id.substr(0, 8)}
        </span>
      );
    },
  },
  {
    label: 'Created On',
    key: 'createdAt',
    render: (data) => {
      return (
        <span>
          {data.createdAt && new Date(data.createdAt).toLocaleDateString()}{' '}
          {data.createdAt && new Date(data.createdAt).toLocaleTimeString()}
        </span>
      );
    },
  },
  {
    label: 'Service Engineer',
    key: 'serviceEngineer',
  },
  {
    label: 'Status',
    key: 'status',
  },
];
