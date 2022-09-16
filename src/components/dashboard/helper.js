/** @format */

import { STATE_TO_CODE_MAP } from '../../core/india-map/utils';

export const HMR_RANGE_MAP = {
  zeroTo500: '0 to 100',
  fiveHunTo1000: '500 to 1000',
  thousandTo1500: '1000 to 1500',
  fifteenHundredTo2000: '1500 to 2000',
  above2000: 'Above 2000',
};

const DEFAULT_SUMARY_DATA = {
  topIssueCausing: [
    {
      label: 'Part',
      data: '-',
      count: 0,
    },
    {
      label: 'List',
      data: '-',
      count: 0,
    },
    {
      label: 'Tickets OEM',
      data: '-',
      count: 0,
    },
  ],
  topModelHMR: [
    {
      label: 'Model',
      data: '-',
      count: 0,
    },
    {
      label: 'HMR',
      data: '-',
      count: 0,
    },
    {
      label: 'State',
      data: '-',
      count: 0,
    },
  ],
};

export const formatReports = (response) => {
  let reportsData = {
    ticketSummaryCards: [],
    maxStateIssues: {},
    minStateIssue: {},
    ...DEFAULT_SUMARY_DATA,
  };
  if (response.partWiseCounts && response.partWiseCounts.length > 0) {
    reportsData.topIssueCausing[0] = {
      label: 'Part',
      data: response.partWiseCounts[0].part,
      count: response.partWiseCounts[0].count,
    };
  }
  if (response.listNoWiseCounts && response.listNoWiseCounts.length > 0) {
    reportsData.topIssueCausing[1] = {
      label: 'List ',
      data: response.listNoWiseCounts[0].listNo,
      count: response.listNoWiseCounts[0].count,
    };
  }
  if (response.oemWiseCounts && response.oemWiseCounts.length > 0) {
    reportsData.topIssueCausing[2] = {
      label: 'Tickets OEM',
      data: response.oemWiseCounts[0].name,
      count: response.oemWiseCounts[0].count,
    };
  }

  if (
    response.engineModalWiseCounts &&
    response.engineModalWiseCounts.length > 0
  ) {
    reportsData.topModelHMR[0] = {
      label: 'Model',
      data: response.engineModalWiseCounts[0].engineModal,
      count: response.engineModalWiseCounts[0].count,
    };
  }

  if (
    response.hmrWiseCounts &&
    Object.keys(response.hmrWiseCounts || {}).length > 0
  ) {
    let name = '';
    let count = 0;

    Object.keys(response.hmrWiseCounts || {}).forEach((key) => {
      if (response.hmrWiseCounts[key] > count) {
        name = key;
        count = response.hmrWiseCounts[key];
      }
    });

    reportsData.topModelHMR[1] = {
      label: 'HMR',
      data: HMR_RANGE_MAP[name],
      count: count,
    };
  }

  if (response.stateWiseCounts && response.stateWiseCounts.length > 0) {
    reportsData.maxStateIssue = response.stateWiseCounts[0];
    reportsData.minStateIssue =
      response.stateWiseCounts[response.stateWiseCounts.length - 1];

    reportsData.topModelHMR[2] = {
      label: 'State',
      data: response.stateWiseCounts[0].name,
      count: response.stateWiseCounts[0].count,
    };
  }

  reportsData.ticketSummaryCards = [
    {
      label: 'Open',
      count: 10,
    },
    {
      label: 'Without resolution',
      count: 12,
    },
    {
      label: 'Reopened/Unresolved',
      count: 20,
    },
    {
      label: 'Total tickets',
      count: 10,
    },
  ];

  return reportsData;
};

export const formatIndiaMapData = (list) => {
  let codes = {};
  list.forEach((item) => {
    codes[STATE_TO_CODE_MAP[item.name.toLowerCase()]] = item.count;
  });

  return codes;
};

export const ENG_DETAILS_STATE = {
  series: [
    {
      name: 'Count in year',
      type: 'column',
      data: [328, 234, 176, 241, 204],
    },
    {
      name: '2017-18',
      type: 'line',      
      data: [       
        null,
        null,
        null,
        null,
        null,
        22,
        30,
        34,
        31,
        26,
        28,
        33,
        40,
        28,
        18,
        15,
        23,
      ],
    },
    {
      name: '2018-19',
      type: 'line',      
      data: [       
        null,
        null,
        null,
        null,
        null,
        35,
        27,
        26,
        19,
        11,
        12,
        30,
        19,
        19,
        15,
        11,
        10,
      ],
    },
    {
      name: '2019-20',
      type: 'line',      
      data: [
      
        null,
        null,
        null,
        null,
        null,
        10,
        19,
        18,
        22,
        18,
        14,
        17,
        10,
        19,
        9,
        13,
        7,
      ],
    },
    {
      name: '2020-21',
      type: 'line',      
      data: [
       
        null,
        null,
        null,
        null,
        null,
        8,
        20,
        21,
        27,
        17,
        20,
        13,
        23,
        32,
        13,
        19,
        28,
      ],
    },
    {
      name: '2021-22',
      type: 'line',      
      data: [
       
        null,
        null,
        null,
        null,
        null,
        22,
        9,
        14,
        27,
        11,
        13,
        15,
        21,
        29,
        10,
        11,
        22,
      ],
    }   
  ],
  options: {
    colors: [
      function ({ value, seriesIndex, w }) {        
        if (seriesIndex === 0) {
          switch (value) {
            case 328:
              return '#00B050';
            case 234:
              return '#FFC100';
            case 176:
              return '#ED7D31';
            case 241:
              return '#006FC0';
            case 204:
              return '#FF0100';
            default:
              return '#000000';
          }
        } else {
          switch (seriesIndex) {
            case 1:
              return '#00B050';
            case 2:
              return '#FFC100';
            case 3:
              return '#ED7D31';
            case 4:
              return '#006FC0';
            case 5:
              return '#FF0100';
            case 6:
              return '#000000';
          }
        }
      },
    ],
    chart: {
      type: 'bar',
    }, 
    stroke: {
      width: [0, 4],
      curve: 'smooth',
    },
    title: {
      text: '',
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [0],
    },
    labels: [
      '2017-18',
      '2018-19',
      '2019-20',
      '2020-21',
      '2021-22',      
      'APR',
      'MAY',
      'JUN',
      'JUL',
      'AUG',
      'SEP',
      'OCT',
      'NOV',
      'DEC',
      'JAN',
      'FEB',
      'MAR',
    ],
    yaxis: [
      {
        title: {
          text: 'Year Count',
        },
      },
      {
        seriesName: '2017-18',
        opposite: true,
        title: {
          text: 'Month Count',
        },
      },
      {
        seriesName: '2017-18',
        show: false,
      },
      {
        seriesName: '2017-18',
        show: false,
      },
      {
        seriesName: '2017-18',
        show: false,
      },
      {
        seriesName: '2017-18',
        show: false,
      },
      {
        seriesName: '2017-18',
        show: false,
      },
    ],
    legend: {
      show: false,
    },
  },
};

export const CURRENT_ENG_DETAILS_STATE = {
  series: [
    {
      name: '2022-2023',
      type: 'column',
      data: [],
    },
    {
      name: 'Count In Each Month',
      type: 'line',
      data: [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ],
    },
  ],
  options: {
    colors: ['#000000'],
    chart: {
      height: 450,
      type: 'line',
    },
    stroke: {
      width: [0, 4],
    },
    title: {
      text: '',
    },
    plotOptions: {
      bar: { columnWidth: '70%', distributed: true, barHeight: '85%' },
      line: { columnWidth: '70%', distributed: true, barHeight: '85%' },
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [0],
    },
    labels: [
      '2022-2023',
      'APR',
      'MAY',
      'JUN',
      'JUL',
      'AUG',
      'SEP',
      'OCT',
      'NOV',
      'DEC',
      'JAN',
      'FEB',
      'MAR',
    ],
    yaxis: [
      {
        title: {
          text: 'Count',
        },
      },
      {
        opposite: true,
        title: {
          text: 'Counts',
        },
      },
    ],
    legend: {
      show: false,
    },
  },
};

export const CUR_MONTH_INDX = {
  APR: 1,
  MAY: 2,
  JUN: 3,
  JUL: 4,
  AUG: 5,
  SEP: 6,
  OCT: 7,
  NOV: 8,
  DEC: 9,
  JAN: 10,
  FEB: 11,
  MAR: 12,
};
