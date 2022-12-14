import { Button, TextareaAutosize, TextField } from '@mui/material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { APPROVAL_LIST } from '../../../utils/mock';
import {
  getOfflineData,
  setOfflineData,
} from '../../../utils/offline-services';
import RequestApprovalModal from '../request-approval';
import './index.scss';

const RecruitmentForm = ({ user }) => {
  const { mode, id = '' } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const { role, canApproveRequest = '' } = user;

  useEffect(() => {
    if (mode === 'edit' && id) {
      let tickets = getOfflineData('tickets') || APPROVAL_LIST;
      setFormData(tickets.find((r) => r.id == id) || {});
    } else {
      setFormData({});
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
      pdf.save('proposal_for_recruitment.pdf');
    });
  };

  const submitRequest = () => {
    if (role === 'Request' || mode === 'create') {
      let tickets = getOfflineData('tickets') || APPROVAL_LIST;
      formData.id = tickets.length + 1;
      let data = {
        ...formData,
        submittedDate: new Date(),
        status: 'Pending',
        nextStatus: '',
        formType: 0,
        assignedTo: 'WTD_approver',
      };

      setOfflineData('tickets', [...tickets, data]);
      toast.info('Request Submitted successfully');
      navigate('/');
    } else {
      setOpenModal(true);
    }
  };

  const onApprove = (newData) => {
    let data = getOfflineData('tickets') || APPROVAL_LIST;
    let index = data.findIndex((r) => r.id == id);
    if (index !== -1) {
      data[index] = newData;
      setOfflineData('tickets', data);
      setFormData(newData);
    }
    toast.info('Request Updated Successfully');
  };

  const { comments = [] } = formData || {};

  const displayApproved = () => {
    if (mode === 'edit' && role !== 'Request') {
      if (comments.find((c) => c.email === user.email)) {
        return false;
      }
      return comments.length <= 2;
    } else if (role !== 'Request') {
      return true;
    }
  };

  return (
    <div className='recruitment-form-container' id='request'>
      <div className='form-header'>
        <div className='l-c'>
          <img
            src={require('../../../resources/logo.png')}
            className='form-logo'
          />
          <span>
            No. 861, 862, Anna Salai,
            <div>Border Thottam, Padupakkam, Triplicane,</div>
            Chennai, Tamil Nadu 600002
          </span>
        </div>
        <div className='r-c'>{new Date().toLocaleDateString()}</div>
      </div>
      <div className='signature-list'>
        {comments.map((comment) => {
          return (
            <>
              <div className='signature-container'>
                <div>{comment.by}</div>
                <img src={comment.signature} className='signature-img' />
                <span>{comment.date}</span>
              </div>
              {/* <div id='approver-comment'> Comment: {comment.msg}</div> */}
            </>
          );
        })}
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
      <div className='button-container' id='approve-button'>
        {mode === 'edit' && (
          <Button
            variant='contained'
            color='primary'
            fullWidth
            onClick={() => downloadPDF()}
          >
            Download Report
          </Button>
        )}
        {role === 'Request' && mode === 'create' && (
          <Button
            variant='contained'
            color='primary'
            fullWidth
            onClick={() => submitRequest()}
          >
            {'Submit for Approval'}
          </Button>
        )}
        {canApproveRequest && displayApproved() && (
          <Button
            variant='contained'
            color='primary'
            fullWidth
            onClick={() => submitRequest()}
          >
            {canApproveRequest && mode === 'edit'
              ? 'Take Action'
              : 'Submit for Approval'}
          </Button>
        )}
      </div>
      {openModal && (
        <RequestApprovalModal
          onClose={() => setOpenModal(false)}
          onSave={(status, comment, file) => {
            const { comments = [] } = formData;
            let statusData = {
              status: `${status} By ${user.name}`,
              assignedTo: 'CFO & CS_approver',
            };

            if (comments.length >= 1) {
              statusData.status = status;
              statusData.assignedTo = 'NA';
            }
            onApprove({
              ...formData,
              ...statusData,
              comments: [
                ...comments,
                {
                  msg: comment,
                  by: user.name,
                  status: status,
                  email: user.email,
                  signature: file ? URL.createObjectURL(file) : '',
                  date: new Date().toLocaleString(),
                },
              ],
            });
            setOpenModal(false);
          }}
        />
      )}
    </div>
  );
};

export default RecruitmentForm;
