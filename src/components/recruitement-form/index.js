import { Button, TextareaAutosize, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { APPROVAL_LIST } from '../../utils/mocks';
import './index.scss';

const RecruitmentForm = () => {
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
      <div className="fitment-details-table">
        <div className="f-row">
          <div className="f-col">Details</div>
          <div className="f-col">Last drawn Emoluments</div>
          <div className="f-col">Our Offer Stipend Rs.</div>
        </div>
        <div className="f-row">
          <div className="f-col">
            <TextField
              size="small"
              onChange={onChange}
              name="details"
              value={formData.details}
              disabled={disabled}
            />
          </div>
          <div className="f-col">
            <TextField
              size="small"
              onChange={onChange}
              name="emoluments"
              value={formData.emoluments}
              disabled={disabled}
            />
          </div>
          <div className="f-col">
            <TextareaAutosize
              name="offerStipend"
              onChange={onChange}
              value={formData.offerStipend}
              disabled={disabled}
              minRows={2}
              size="small"
            />
          </div>
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

export default RecruitmentForm;
