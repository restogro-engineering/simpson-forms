import { Button, TextareaAutosize, TextField } from '@mui/material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import SubwayFileUpload from '../../../core/file-uploader';
import { APPROVAL_LIST } from '../../../utils/mock';
import {
  getOfflineData,
  setOfflineData,
} from '../../../utils/offline-services';
import RequestApprovalModal from '../request-approval';
import './index.scss';

const RecruitmentForm3 = ({ user }) => {
  const { mode, id = '', formType } = useParams();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    submittedDate: '15/09/2022',
    status: 'Pending',
    nextStatus: '',
    assignedTo: 'WTD_approver',
  });
  const [buyerSignature, setBuyerSignature] = useState('');
  const { role, canApproveRequest = '' } = user;

  useEffect(() => {
    if (mode === 'edit' && id) {
      let tickets = getOfflineData('tickets') || APPROVAL_LIST;
      setFormData(tickets.find((r) => r.id === id) || {});
    } else {
      setFormData({});
    }
  }, [mode]);

  const onChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const disabled = mode === 'edit';

  const downloadPDF = async () => {
    const docElement = document.querySelector('#request-form');
    const canvas = await html2canvas(docElement, {
      onclone: (document) => {},
    });

    var imgData = canvas.toDataURL('image/png');
    var pdf = new jsPDF('p', 'pt', [canvas.width, canvas.height]);
    var pdfWidth = pdf.internal.pageSize.getWidth();
    var pdfHeight = pdf.internal.pageSize.getHeight();
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

    pdf.save('mypdf.pdf');
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
        assignedTo: 'WTD_approver',
      };

      setOfflineData('tickets', [...tickets, data]);
      toast.info('Request Submitted successfully');
      navigate('/');
    } else {
      setOpenModal(true);
    }
  };

  const { comments = [] } = formData || {};

  const displayApproved = () => {
    if (mode !== 'edit') {
      switch (`${formType}`) {
        case '0':
          return comments.length <= 2;
        case '1':
          return comments.length <= 2;
        case '2':
          return comments.length <= 2;
        default:
          return true;
      }
    }
    return false;
  };

  return (
    <div className='recruitment-form-3-container' id='request-form'>
      <div className='form-header'>
        <img
          src={require('../../../resources/logo.png')}
          className='form-logo'
        />
        <span className='h-text'>
          ASP DIVISION
          <div>NEW VENDOR CODIFICATION FORM</div>
        </span>
      </div>
      <div className='text-right'>
        <div>
          Thro: WTD / CFO & CS <br />
          {new Date().toLocaleDateString()}
        </div>
      </div>
      <div className='signatureList'>
        {comments.map((comment) => {
          return (
            <div className='signature-container'>
              <div>{comment.by}</div>
              <img src={comment.signature} className='signature-img' />
              <span>{comment.date}</span>
            </div>
          );
        })}
      </div>
      <div className='input-form-center'>
        <div className='input-form-row'>
          <div>Name of the vendor</div>
          <div>
            <TextField
              size='small'
              onChange={onChange}
              name='position'
              value={formData.vendorName}
              disabled={disabled}
            />
          </div>
        </div>
        <div className='input-form-row'>
          <div>Address (with Pincode)</div>
          <div>
            <TextareaAutosize
              size='small'
              minRows={4}
              onChange={onChange}
              name='address'
              value={formData.address}
              disabled={disabled}
            />
          </div>
        </div>
        <div className='input-form-row'>
          <div>Email</div>
          <div>
            <TextField
              size='small'
              onChange={onChange}
              name='vacancy'
              value={formData.email}
              disabled={disabled}
            />
          </div>
        </div>
        <div className='input-form-row'>
          <div>Phone Number</div>
          <div>
            <TextField
              size='small'
              onChange={onChange}
              name='natureOfVacancy'
              value={formData.phone}
              disabled={disabled}
            />
          </div>
        </div>
        <div className='input-form-row'>
          <div>GST RegistraXon No.</div>
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
          <div>I.T.PAN NO</div>
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
          <div>MSME Registered</div>
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
          <div>MSME Registered No (if Yes)</div>
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
        <div className='text-center'>
          Details to be furnished by the Buyer Dept.
        </div>
        <div className='input-form-row'>
          <div>Payment terms</div>
          <div>
            <TextField
              size='small'
              onChange={onChange}
              name='paymentTerms'
              value={formData.paymentTerms}
              disabled={disabled}
            />
          </div>
        </div>{' '}
        <div className='input-form-row'>
          <div>Supply category </div>
          <div>
            <TextField
              size='small'
              onChange={onChange}
              name='supplyCategory'
              value={formData.supplyCategory}
              disabled={disabled}
            />
          </div>
        </div>{' '}
        <div className='input-form-row'>
          <div>G.I.type</div>
          <div>
            <TextField
              size='small'
              onChange={onChange}
              name='giType'
              value={formData.giType}
              disabled={disabled}
            />
          </div>
        </div>
        <div className='input-form-row'>
          <div>Reason for developing this</div>
          <div>
            <TextField
              size='small'
              onChange={onChange}
              name='reason'
              value={formData.reason}
              disabled={disabled}
            />
          </div>
        </div>
        <div className='input-form-row'>
          <div>Department</div>
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
          <div>Name and Signature of Buyer</div>
          <div>
            {!openModal && (
              <SubwayFileUpload
                title='Signature'
                onFileUpload={(file) => {
                  debugger;
                  setBuyerSignature(file);
                }}
              />
            )}
          </div>
        </div>
        <div className='text-center'>For Accounts Dept.Use</div>
        <div className='input-form-row'>
          <div>Vendor Code</div>
          <div>
            <TextField
              size='small'
              onChange={onChange}
              name='vendorCode'
              value={formData.vendorCode}
              disabled={disabled}
            />
          </div>
        </div>
        <div className='input-form-row'>
          <div>Date of Registration</div>
          <div>
            <TextField
              size='small'
              onChange={onChange}
              name='dateOfRegistration'
              value={formData.dateOfRegistration}
              disabled={disabled}
            />
          </div>
        </div>
        <div className='input-form-row'>
          <div>Head of the Dept</div>
          <div>
            <TextField
              size='small'
              onChange={onChange}
              name='deptHead'
              value={formData.deptHead}
              disabled={disabled}
            />
          </div>
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
        {displayApproved() && (
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
            setFormData({
              ...formData,
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

export default RecruitmentForm3;
