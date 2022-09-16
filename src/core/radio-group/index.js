import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { convertToCamelCaseFromUnderScore } from "../../utils";

export default function RowRadioButtonsGroup({
  label,
  options = [],
  value,
  onChange
}) {
  return (
    <FormControl>
      <FormLabel id='demo-row-radio-buttons-group-label'>{label}</FormLabel>
      <RadioGroup row value={value} onChange={onChange}>
        {options.map(option => {
          return (
            <div>
              <FormControlLabel
                value={option}
                control={<Radio />}
                label={convertToCamelCaseFromUnderScore(option)}
              />
            </div>
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}
