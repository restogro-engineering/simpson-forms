import { Button, TextareaAutosize, TextField } from '@mui/material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { APPROVAL_LIST } from '../../../utils/mock';
import RequestApprovalModal from '../request-approval';
import './index.scss';

const RecruitmentForm = () => {
  const { mode } = useParams();
  const [formData, setFormData] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [approvalDetails, setApprovalDEtails] = useState({});

  useEffect(() => {
    if (mode === 'edit') {
      setFormData(APPROVAL_LIST[0]);
      setApprovalDEtails({
        status: APPROVAL_LIST[0].status,
        comments: 'Request looks fine please go ahead',
        file: require('../../../resources/logo.png'),
      });
    }
  }, []);

  const onChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const disabled = mode === 'edit';

  const downloadPDF = () => {
    const docElement = document.querySelector('#request');
    html2canvas(docElement, {
      onclone: (document) => {
        document.querySelector('#approve-button').style.visibility = 'hidden';
      },
    }).then((canvas) => {
      var imgData = canvas.toDataURL('image/png');
      var pdf = new jsPDF('p', 'pt', [canvas.width, canvas.height]);
      var pdfWidth = pdf.internal.pageSize.getWidth();
      var pdfHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('mypdf.pdf');
    });
  };

  return (
    <div className='recruitment-form-container' id='request'>
      <div className='form-row'>
        <div>Simpson & Co Ltd., </div>
        <div>Chennai - 600002 </div>
      </div>
      <div className='form-row'>
        <div>Sr. VP(O) / President / Whole Time Director / CFO & CS </div>
        <div>{new Date().toLocaleDateString()} </div>
      </div>
      <div className='form-center'>
        <span>PROPOSAL FOR RECRUITMENT</span>
      </div>
      <div className='input-form-center'>
        <div className='input-form-row'>
          <div>Position</div>
          <div>
            <TextField
              size='small'
              onChange={onChange}
              name='position'
              value={formData.position}
              disabled={disabled}
            />
          </div>
        </div>
        <div className='input-form-row'>
          <div>Dept. / Plant / Location</div>
          <div>
            <TextField
              size='small'
              onChange={onChange}
              name='dept'
              value={formData.dept}
              disabled={disabled}
            />
          </div>
        </div>
        <div className='input-form-row'>
          <div>No. of vacancy </div>
          <div>
            <TextField
              size='small'
              onChange={onChange}
              name='vacancy'
              value={formData.vacancy}
              disabled={disabled}
            />
          </div>
        </div>
        <div className='input-form-row'>
          <div>Nature of vacancy</div>
          <div>
            <TextField
              size='small'
              onChange={onChange}
              name='natureOfVacancy'
              value={formData.natureOfVacancy}
              disabled={disabled}
            />
          </div>
        </div>
        <div className='input-form-row'>
          <div>Interviewed by</div>
          <div>
            <TextField
              size='small'
              onChange={onChange}
              name='interviewedBy'
              value={formData.interviewedBy}
              disabled={disabled}
            />
          </div>
        </div>
        <div className='input-form-row'>
          <div>Name of the candidate</div>
          <div>
            <TextField
              size='small'
              onChange={onChange}
              name='candidateName'
              value={formData.candidateName}
              disabled={disabled}
            />
          </div>
        </div>
        <div className='input-form-row'>
          <div>Qualification</div>
          <div>
            <TextField
              size='small'
              onChange={onChange}
              name='qualification'
              value={formData.qualification}
              disabled={disabled}
            />
          </div>
        </div>
        <div className='input-form-row'>
          <div>Experience</div>
          <div>
            <TextField
              size='small'
              onChange={onChange}
              name='experience'
              value={formData.experience}
              disabled={disabled}
            />
          </div>
        </div>
      </div>
      <div className='form-center'>
        <span className='u-text'>FITMENT PROPOSED</span>
      </div>
      <div className='fitment-details-table'>
        <div className='f-row'>
          <div className='f-col'>Details</div>
          <div className='f-col'>Last drawn Emoluments</div>
          <div className='f-col'>Our Offer Stipend Rs.</div>
        </div>
        <div className='f-row'>
          <div className='f-col'>
            <TextField
              size='small'
              onChange={onChange}
              name='details'
              value={formData.details}
              disabled={disabled}
            />
          </div>
          <div className='f-col'>
            <TextField
              size='small'
              onChange={onChange}
              name='emoluments'
              value={formData.emoluments}
              disabled={disabled}
            />
          </div>
          <div className='f-col'>
            <TextareaAutosize
              name='offerStipend'
              onChange={onChange}
              value={formData.offerStipend}
              disabled={disabled}
              minRows={2}
              size='small'
            />
          </div>
        </div>
      </div>

      <div className='input-form-row-1'>
        <div>Fees to be paid to the Consultant (if applicable) </div>
        <div>
          <TextField
            size='small'
            onChange={onChange}
            name='fee'
            value={formData.fee}
            disabled={disabled}
          />
        </div>
      </div>
      {approvalDetails.status && (
        <div className='request -details'>
          <div>Request Status : {approvalDetails.status}</div>
          <div>Approved By : Manikanata</div>
          <div>Request comments : {approvalDetails.comments}</div>
          <div>
            Signature :
            <img src={approvalDetails.file} width='160' height='auto' />
          </div>
        </div>
      )}
      <div className='button-container' id='approve-button'>
        {approvalDetails.status ? (
          <Button
            variant='contained'
            color='primary'
            fullWidth
            onClick={() => downloadPDF()}
          >
            Download Report
          </Button>
        ) : (
          <Button
            variant='contained'
            color='primary'
            fullWidth
            onClick={() => setOpenModal(true)}
          >
            Submit for Approval
          </Button>
        )}
      </div>
      {openModal && (
        <RequestApprovalModal
          onClose={() => setOpenModal(false)}
          onSave={(status, comments, file) => {
            setApprovalDEtails({
              status,
              comments,
              file: file ? URL.createObjectURL(file) : '',
            });
            setOpenModal(false);
          }}
        />
      )}
    </div>
  );
};

export default RecruitmentForm;
