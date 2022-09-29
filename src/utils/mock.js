export const APPROVAL_LIST = [
  {
    id: '1',
    submittedDate: new Date(),
    status: 'Approved',
    assignedTo: 'NA',
    nextStatus: '',
    comments: [
      {
        msg: 'Request looks fine please go ahead',
        by: 'Sr. VP(O)',
        status: 'Approved',
        signature: require('../resources/signature.png'),
        date: '17/09/2022',
        email: 'ceo@gmail.com',
      },
      {
        msg: 'Request looks fine please go ahead',
        by: 'President',
        status: 'Approved',
        signature: require('../resources/signature2.png'),
        date: '17/09/2022',
      },
    ],
    position: 'Graduate Engineer Trainee',
    dept: 'MCD, ASP',
    vacancy: '3',
    natureOfVacancy: 'Replacement fo Engineer Trainee',
    interviewedBy: 'Sr. VP(O)/President/Sr. GM-Materials/GM-HR&PR',
    candidateName: 'Harinarayanan',
    qualification: 'Some degree',
    experience: '6 Years',
    formType: 0,
    details: 'Stipend',
    emoluments: '',
    offerStipend:
      'First Year  :  Rs.21,500/- per month , Second Year    :  Rs.25,000/- per Month',

    fee: 'Nil.  Ref. by Mr. R. Harinarayanan, Sr. Engineer, MCD Emp. No : 10094.',
    basic: 100,
    hra: 100,
    conveyanceAllowance: 100,
    educationAllowance: 100,
    specialAllowance: 100,
    leaveTravelAllowance: 100,
    medicalAllowance: 100,
  },
  {
    id: '2',
    submittedDate: new Date(),
    status: 'Approved',
    assignedTo: 'NA',
    nextStatus: '',
    comments: [
      {
        msg: 'Request looks fine please go ahead',
        by: 'Sr. VP(O)',
        status: 'Approved',
        signature: require('../resources/signature.png'),
        date: '17/09/2022',
        email: 'ceo@gmail.com',
      },
      {
        msg: 'Request looks fine please go ahead',
        by: 'President',
        status: 'Approved',
        signature: require('../resources/signature2.png'),
        date: '17/09/2022',
        email: 'wtd@gmail.com',
      },
    ],
    formType: 1,
    position: 'Graduate Engineer Trainee',
    dept: 'MCD, ASP',
    vacancy: '3',
    natureOfVacancy: 'Replacement fo Engineer Trainee',
    interviewedBy: 'Sr. VP(O)/President/Sr. GM-Materials/GM-HR&PR',
    candidateName: 'Harinarayanan',
    qualification: 'Some degree',
    experience: '6 Years',
    details: 'Stipend',
    emoluments: '',
    offerStipend:
      'First Year  :  Rs.21,500/- per month , Second Year    :  Rs.25,000/- per Month',
    fee: 'Nil.  Ref. by Mr. R. Harinarayanan, Sr. Engineer, MCD Emp. No : 10094.',
    approvedBy: '',
    basic: 100,
    hra: 100,
    conveyanceAllowance: 100,
    educationAllowance: 100,
    specialAllowance: 100,
    leaveTravelAllowance: 100,
    medicalAllowance: 100,
  },
  {
    id: '3',
    submittedDate: new Date(),
    status: 'Rejected',
    nextStatus: 'Rejected',
    assignedTo: 'Manikanta',
    comments: [
      {
        msg: 'Request not ok',
        by: 'Sr. VP(O)',
        status: 'Rejected',
        signature: require('../resources/signature.png'),
        date: '17/09/2022',
      },
    ],
    position: 'Graduate Engineer Trainee',
    dept: 'MCD, ASP',
    vacancy: '3',
    natureOfVacancy: 'Replacement fo Engineer Trainee',
    interviewedBy: 'Sr. VP(O)/President/Sr. GM-Materials/GM-HR&PR',
    candidateName: 'Harinarayanan',
    qualification: 'Some degree',
    experience: '6 Years',
    details: 'Stipend',
    emoluments: '',
    offerStipend:
      'First Year  :  Rs.21,500/- per month , Second Year    :  Rs.25,000/- per Month',
    fee: 'Nil.  Ref. by Mr. R. Harinarayanan, Sr. Engineer, MCD Emp. No : 10094.',
    approvedBy: '',
    basic: 100,
    hra: 100,
    formType: 1,
    conveyanceAllowance: 100,
    educationAllowance: 100,
    specialAllowance: 100,
    leaveTravelAllowance: 100,
    medicalAllowance: 100,
  },
  {
    id: '4',
    submittedDate: new Date(),
    status: 'Pending',
    nextStatus: '',
    assignedTo: 'Manikanta',
    comments: [],
    position: 'Graduate Engineer Trainee',
    dept: 'MCD, ASP',
    vacancy: '3',
    natureOfVacancy: 'Replacement fo Engineer Trainee',
    interviewedBy: 'Sr. VP(O)/President/Sr. GM-Materials/GM-HR&PR',
    candidateName: 'Harinarayanan',
    qualification: 'Some degree',
    experience: '6 Years',
    details: 'Stipend',
    emoluments: '',
    offerStipend:
      'First Year  :  Rs.21,500/- per month , Second Year    :  Rs.25,000/- per Month',
    fee: 'Nil.  Ref. by Mr. R. Harinarayanan, Sr. Engineer, MCD Emp. No : 10094.',
    approvedBy: '',
    basic: 100,
    hra: 100,
    formType: 1,
    conveyanceAllowance: 100,
    educationAllowance: 100,
    specialAllowance: 100,
    leaveTravelAllowance: 100,
    medicalAllowance: 100,
  },
];

export const APP_USERS = [
  {
    id: '1',
    role: 'CFO',
    name: 'Approver2',
    email: 'approver2@gmail.com',
    canApproveRequest: true,
  },
  {
    id: '2',
    role: 'WTD',
    name: 'Approver1',
    email: 'approver1@gmail.com',
    canApproveRequest: true,
  },
  {
    id: '3',
    role: 'Request',
    name: 'Requester',
    email: 'request@gmail.com',
    canApproveRequest: false,
  },
];

export const APPROVAL_CONFIG = {
  0: ['WTD', 'CFO'],
  1: ['WTD', 'CFO'],
  2: ['WTD', 'CFO'],
};
