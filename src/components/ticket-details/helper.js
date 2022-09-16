export const REASONS_FOR_ENGINE_REPLACEMENT = {
  new_engine: [
    "New List No",
    "Float Unavailability",
    "Very early hour failure"
  ],
  from_oem_plant: [
    "New List No",
    "Float Unavailability",
    "Very early hour failure"
  ],
  through_spd_mode: [
    "New List No",
    "Float Unavailability",
    "Very early hour failure"
  ]
};

export const convertPartsToString = partsReplacementIds => {
  return partsReplacementIds.map(p => p.part).toString();
};
