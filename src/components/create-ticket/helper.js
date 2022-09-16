export const getFormConfig = (ticketDetails, errors) => {
  return [
    {
      label: "Name of OEM *",
      name: "oemName",
      type: "select",
      value: ticketDetails.oemName,
      error: errors.oemName,
      helperText: errors.oemName ? "Required" : ""
    },
    {
      label: "OEM Engineer Name",
      name: "oemServiceEngineerName",
      type: "text",
      value: ticketDetails.oemServiceEngineerName,
      error: errors.oemServiceEngineerName,
      helperText: errors.oemServiceEngineerName ? "Required" : ""
    },
    {
      label: "OEM Engineer Contact",
      name: "oemServiceEngineerContact",
      type: "number",
      value: ticketDetails.oemServiceEngineerContact,
      error: errors.oemServiceEngineerContact,
      helperText: errors.oemServiceEngineerContact ? "Required" : ""
    },
    {
      label: "Location of Engine (Full Address with PinCode)",
      name: "oemEngineLocation",
      subForm: [
        {
          label: "Address",
          name: "tractorAddress",
          value:
            ticketDetails.oemEngineLocation &&
            ticketDetails.oemEngineLocation.tractorAddress,
          type: "text"
        },
        {
          label: "pinCode",
          name: "pinCode",
          value:
            ticketDetails.oemEngineLocation &&
            ticketDetails.oemEngineLocation.pinCode,
          type: "number"
        }
      ],
      type: "address"
    },
    {
      label: "OEM Dealer Name",
      name: "oemDealerName",
      type: "text",
      value: ticketDetails.oemDealerName,
      error: errors.oemDealerName,
      helperText: errors.oemDealerName ? "Required" : ""
    },
    {
      label: "Engine Serial No",
      name: "engineSerialNumber",
      type: "number",
      value: ticketDetails.engineSerialNumber,
      error: errors.engineSerialNumber,
      helperText: errors.engineSerialNumber ? "Required" : ""
    },
    {
      label: "Unit / Machine Serial Number",
      name: "unitSerialNumber",
      type: "text",
      value: ticketDetails.unitSerialNumber,
      error: errors.unitSerialNumber,
      helperText: errors.unitSerialNumber ? "Required" : ""
    },
    {
      label: "Date of Sale / Installation of Machine",
      name: "dateOfSale",
      type: "date",
      value: ticketDetails.dateOfSale,
      error: errors.dateOfSale,
      helperText: errors.dateOfSale ? "Required" : ""
    },
    {
      label: "Date of customer complaint",
      name: "customerComplaintDate",
      type: "date",
      value: ticketDetails.customerComplaintDate,
      error: errors.customerComplaintDate,
      helperText: errors.customerComplaintDate ? "Required" : ""
    },
    {
      label: "Hours of Operation",
      name: "hmr",
      type: "text",
      value: ticketDetails.hmr,
      error: errors.hmr,
      helperText: errors.hmr ? "Required" : ""
    },
    {
      label: "Nature of Customer Complaint",
      name: "natureOfCustomerComplaint",
      type: "text",
      value: ticketDetails.natureOfCustomerComplaint,
      error: errors.natureOfCustomerComplaint,
      helperText: errors.natureOfCustomerComplaint ? "Required" : ""
    },
    {
      label: "Customer Name",
      name: "customerName",
      type: "text",
      value: ticketDetails.customerName,
      error: errors.customerName,
      helperText: errors.customerName ? "Required" : ""
    },
    {
      label: "Customer Contact Number",
      name: "customerContact",
      type: "number",
      value: ticketDetails.customerContact,
      error: errors.customerContact,
      helperText: errors.customerContact ? "Required" : ""
    },
    {
      label: "Past History (if any)",
      name: "pastHistory",
      type: "PAST_HISTORY"
    },
    {
      label: "Details of Free Services",
      name: "",
      subForm: [],
      type: "FREE_SERVICES"
    },
    {
      label: "Details of Investigation carried out by OEM",
      name: "investigationDetailsByOem",
      type: "text",
      value: ticketDetails.investigationDetailsByOem,
      error: errors.investigationDetailsByOem,
      helperText: errors.investigationDetailsByOem ? "Required" : ""
    },
    {
      label: "Action Taken by OEM",
      name: "actionTakenByOem",
      type: "text",
      value: ticketDetails.actionTakenByOem,
      error: errors.actionTakenByOem,
      helperText: errors.actionTakenByOem ? "Required" : ""
    },
    {
      label: "Remarks",
      name: "remarks",
      type: "text",
      value: ticketDetails.remarks,
      error: errors.remarks,
      helperText: errors.remarks ? "Required" : ""
    },
    {
      label: "Operation / Application regularly used by customer",
      name: "customerRegularApplication",
      type: "text",
      value: ticketDetails.customerRegularApplication,
      error: errors.customerRegularApplication,
      helperText: errors.customerRegularApplication ? "Required" : ""
    },
    {
      label: "Customer Regular Application",
      name: "customerRegularApplication",
      type: "text",
      value: ticketDetails.customerRegularApplication,
      error: errors.customerRegularApplication,
      helperText: errors.customerRegularApplication ? "Required" : ""
    },
    {
      label:
        "Operation/Application used by customer while the complaint was observed",
      name: "applicationWhileComplaintObserved",
      type: "text",
      value: ticketDetails.applicationWhileComplaintObserved,
      error: errors.applicationWhileComplaintObserved,
      helperText: errors.applicationWhileComplaintObserved ? "Required" : ""
    },
    {
      label: "Soil/Site condition *",
      name: "soilCondition",
      type: "text",
      value: ticketDetails.soilCondition,
      error: errors.soilCondition,
      helperText: errors.soilCondition ? "Required" : ""
    }
  ];
};

export const isFormValid = ticketDetails => {
  let errors = {};
  if (!ticketDetails.soilCondition) {
    errors.soilCondition = true;
  }
  if (!ticketDetails.applicationWhileComplaintObserved) {
    errors.applicationWhileComplaintObserved = true;
  }
  if (!ticketDetails.customerRegularApplication) {
    errors.customerRegularApplication = true;
  }
  if (!ticketDetails.remarks) {
    errors.remarks = true;
  }
  if (!ticketDetails.investigationDetailsByOem) {
    errors.investigationDetailsByOem = true;
  }
  if (!ticketDetails.customerName) {
    errors.customerName = true;
  }
  if (!ticketDetails.oemName) {
    errors.oemName = true;
  }
  if (!ticketDetails.oemServiceEngineerName) {
    errors.oemServiceEngineerName = true;
  }

  if (!ticketDetails.oemServiceEngineerContact) {
    errors.oemServiceEngineerContact = true;
  }
  if (!ticketDetails.oemDealerName) {
    errors.oemDealerName = true;
  }
  if (!ticketDetails.engineSerialNumber) {
    errors.engineSerialNumber = true;
  }
  if (!ticketDetails.unitSerialNumber) {
    errors.unitSerialNumber = true;
  }
  if (!ticketDetails.dateOfSale) {
    errors.dateOfSale = true;
  }

  if (!ticketDetails.customerComplaintDate) {
    errors.customerComplaintDate = true;
  }
  if (!ticketDetails.hmr) {
    errors.hmr = true;
  }
  if (!ticketDetails.dateOfSale) {
    errors.dateOfSale = true;
  }
  
  return errors;
};

export const formatFreeServicesPayload = services => {
  return {
    firstService: getServiceObject(services, "firstService"),
    secondService: getServiceObject(services, "secondService"),
    thirdService: getServiceObject(services, "thirdService"),
    fourthService: getServiceObject(services, "fourthService")
  };
};

const getServiceObject = (services, type) => {
  let service = services.find(s => s && s.name && s.name.value === type) || {};
  if (service.name) {
    let se = JSON.parse(JSON.stringify(service));
    delete se.name;
    return se;
  }
  return service;
};

const SERVICE_LIST = [
  { label: "1st Service", value: "firstService" },
  { label: "2nd Service", value: "secondService" },
  { label: "3rd Service", value: "thirdService" },
  { label: "4th Service", value: "fourthService" }
];

export const convertFreeServiceObjectToArray = services => {
  let result = [];
  Object.keys(services).forEach(key => {
    if (services[key].runningHours) {
      result.push({
        ...services[key],
        name: SERVICE_LIST.find(s => s.value === key)
      });
    }
  });
};
