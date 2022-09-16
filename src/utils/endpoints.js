/** @format */

export const REST_URLS = {
  LOGIN: '/v1/auth/login',
  TICKETS: '/v1/ticket',
  COMPLAINT: '/v1/complaintForms',
  LIST_OEMS: '/v1/oems/list-oems',
  STAGE_VIEW: '/v1/stage/view',
  ASSIGN_SE: '/v1/stage/assign-se',
  DEFECT_ACTION: '/v1/stage/defect-and-action',
  A002_ACTION: '/v1/stage/engine-replacement',
  A003_ACTION: '/v1/stage/part-replacement',
  CODES: '/v1/codes?type=',
  SERVICE_ENGINEER: '/v1/users',
  COMMENT: '/v1/stage/comment',
  ADD_SERVICE_ENGINEER: '/v1/auth/register',
  TICKETS_REPORTS: '/v1/reports/filterby-status',
  SE_REPORTS: '/v1/reports/filterby-SE',
  List_CODES: '/v1/codes',
  OEM_REPORTS: '/v1/reports/filterby-OEM',
  LIST_REPORTS_OEMS: '/v1/reports/list-oems',
  MAILING_LIST: '/v1/mailing-list',
  DASHBOARD: '/v1/dashboard/all-info',
  OEMS: '/v1/oems',
  TICKETS_COUNTS: '/v1/dashboard/ticket-counts',
  OUT_OF_WARRANTY: '/v1/stage/extended-warranty-help',
  ENTER_ENGINE_DETAILS: '/v1/stage/enter-engine-details',
  OEM_NAMES: '/v1/oems/names',
  REFRESH_TOKEN: '/v1/auth/refresh-tokens',
  UPLOAD_FILES: '/v1/misc/upload/attachment/',
  HIGHLIGHTS: '/v1/dashboard/highlights',
  CUR_YEAR_TREND: '/v1/dashboard/cur-year-trend',
};

export const HOSTNAME =
  'https://simpcare-admin-api-prod.kindsea-b3d4fa02.eastus2.azurecontainerapps.io';
