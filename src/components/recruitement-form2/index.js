import { Button, TextareaAutosize, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { APPROVAL_LIST } from '../../utils/mocks';
import './index.scss';

const RecruitmentForm2 = () => {
  const { mode } = useParams();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (mode === 'edit') {
      setFormData(APPROVAL_LIST[0]);
    }
  }, []);

  const onChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const disabled = mode === 'edit';

  const getTotal = () => {};

  return (
    <div className="recruitment-form-container">
      <div className="form-row">
        <div>Simpson & Co Ltd., </div>
        <div>Chennai - 600002 </div>
      </div>
      <div className="form-row">
        <div>Sr. VP(O) / President / Whole Time Director / CFO & CS </div>
        <div>{new Date().toLocaleDateString()} </div>
      </div>
      <div className="form-center">
        <span>PROPOSAL FOR RECRUITMENT</span>
      </div>
      <div className="input-form-center">
        <div className="input-form-row">
          <div>Position</div>
          <div>
            <TextField
              size="small"
              onChange={onChange}
              name="position"
              value={formData.position}
              disabled={disabled}
            />
          </div>
        </div>
        <div className="input-form-row">
          <div>Dept. / Plant / Location</div>
          <div>
            <TextField
              size="small"
              onChange={onChange}
              name="dept"
              value={formData.dept}
              disabled={disabled}
            />
          </div>
        </div>
        <div className="input-form-row">
          <div>No. of vacancy </div>
          <div>
            <TextField
              size="small"
              onChange={onChange}
              name="vacancy"
              value={formData.vacancy}
              disabled={disabled}
            />
          </div>
        </div>
        <div className="input-form-row">
          <div>Nature of vacancy</div>
          <div>
            <TextField
              size="small"
              onChange={onChange}
              name="natureOfVacancy"
              value={formData.natureOfVacancy}
              disabled={disabled}
            />
          </div>
        </div>
        <div className="input-form-row">
          <div>Interviewed by</div>
          <div>
            <TextField
              size="small"
              onChange={onChange}
              name="interviewedBy"
              value={formData.interviewedBy}
              disabled={disabled}
            />
          </div>
        </div>
        <div className="input-form-row">
          <div>Name of the candidate</div>
          <div>
            <TextField
              size="small"
              onChange={onChange}
              name="candidateName"
              value={formData.candidateName}
              disabled={disabled}
            />
          </div>
        </div>
        <div className="input-form-row">
          <div>Qualification</div>
          <div>
            <TextField
              size="small"
              onChange={onChange}
              name="qualification"
              value={formData.qualification}
              disabled={disabled}
            />
          </div>
        </div>
        <div className="input-form-row">
          <div>Experience</div>
          <div>
            <TextField
              size="small"
              onChange={onChange}
              name="experience"
              value={formData.experience}
              disabled={disabled}
            />
          </div>
        </div>
      </div>
      <div className="form-center">
        <span className="u-text">FITMENT PROPOSED</span>
      </div>
      <div className="f-text-area">
        <span>
          Based on his Qualification and experience, can be taken as{' '}
          <TextField size="small" variant="standard" /> on probation for a
          period of six months. After completion of his probation period, based
          on his performance, can be taken into company’s roll
        </span>
      </div>
      <div className="fitment-details-table">
        <div className="f-row">
          <div className="f-col">Details</div>
          <div className="f-col">Last drawn Emoluments</div>
          <div className="f-col">Our Offer Stipend Rs.</div>
        </div>
        <div className="f-row">
          <div className="f-col">Basic</div>
          <div className="f-col"></div>
          <div className="f-col">
            <TextField
              name="basic"
              onChange={onChange}
              value={formData.basic}
              disabled={disabled}
              size="small"
            />
          </div>
        </div>
        <div className="f-row">
          <div className="f-col">Basic</div>
          <div className="f-col"></div>
          <div className="f-col">
            <TextField
              name="basic"
              onChange={onChange}
              value={formData.basic}
              disabled={disabled}
              size="small"
            />
          </div>
        </div>
        <div className="f-row">
          <div className="f-col">HRA</div>
          <div className="f-col"></div>
          <div className="f-col">
            <TextField
              name="hra"
              onChange={onChange}
              value={formData.hra}
              disabled={disabled}
              size="small"
            />
          </div>
        </div>
        <div className="f-row">
          <div className="f-col">Conveyance Allowance</div>
          <div className="f-col"></div>
          <div className="f-col">
            <TextField
              name="conveyanceAllowance"
              onChange={onChange}
              value={formData.conveyanceAllowance}
              disabled={disabled}
              size="small"
            />
          </div>
        </div>
        <div className="f-row">
          <div className="f-col">Education Allowance</div>
          <div className="f-col"></div>
          <div className="f-col">
            <TextField
              name="educationAllowance"
              onChange={onChange}
              value={formData.educationAllowance}
              disabled={disabled}
              size="small"
            />
          </div>
        </div>
        <div className="f-row">
          <div className="f-col">Special Allowance</div>
          <div className="f-col"></div>
          <div className="f-col">
            <TextField
              name="specialAllowance"
              onChange={onChange}
              value={formData.specialAllowance}
              disabled={disabled}
              size="small"
            />
          </div>
        </div>
        <div className="f-row">
          <div className="f-col">Leave Travel Allowance</div>
          <div className="f-col"></div>
          <div className="f-col">
            <TextField
              name="leaveTravelAllowance"
              onChange={onChange}
              value={formData.leaveTravelAllowance}
              disabled={disabled}
              size="small"
            />
          </div>
        </div>
        <div className="f-row">
          <div className="f-col">Medical Allowance</div>
          <div className="f-col"></div>
          <div className="f-col">
            <TextField
              name="medicalAllowance"
              onChange={onChange}
              value={formData.medicalAllowance}
              disabled={disabled}
              size="small"
            />
          </div>
        </div>
        <div className="f-row">
          <div className="f-col">Total</div>
          <div className="f-col"></div>
          <div className="f-col">{getTotal()}</div>
        </div>
      </div>
      <div className="input-form-center button-container">
        <div className="input-form-row">
          <div>Fees to be paid to the Consultant (if applicable) </div>
          <div>
            <TextField
              size="small"
              onChange={onChange}
              name="fee"
              value={formData.fee}
              disabled={disabled}
            />
          </div>
        </div>
      </div>
      <div className="button-container">
        <Button variant="contained" fullWidth>
          Submit for Approval
        </Button>
      </div>
    </div>
  );
};

export default RecruitmentForm2;
