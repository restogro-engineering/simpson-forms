import { Button, TextField } from '@mui/material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { APPROVAL_LIST } from '../../../utils/mock';
import { getOfflineData, setOfflineData } from '../../../utils/offline-services';
import RequestApprovalModal from '../request-approval';
import './index.scss';

const RecruitmentForm2 = ({ user }) => {
  const { mode, id = '' } = useParams();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({});
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

  const getTotal = () => {
    const {
      basic,
      hra,
      conveyanceAllowance,
      educationAllowance,
      specialAllowance,
      leaveTravelAllowance,
      medicalAllowance,
    } = formData;

    return (
      +basic +
      +hra +
      +conveyanceAllowance +
      +educationAllowance +
      +specialAllowance +
      +leaveTravelAllowance +
      +medicalAllowance
    );
  };

  const downloadPDF = async () => {
    const docElement = document.querySelector('#page1');
    const docElement2 = document.querySelector('#page2');
    const canvas = await html2canvas(docElement, {
      onclone: (document) => {
        // document.querySelector('#page1').style.padding = '40px';
        // document.querySelector('#page2').style['margin-bottom'] = '60px';
        document.querySelector('#page1').className =
          'recruitment-form-container';
        document.querySelector('#approver-comment').style.visibility = 'hidden';
      },
    });
    const canvas2 = await html2canvas(docElement2, {
      onclone: (document) => {
        // document.querySelector('#page2').style.padding = '40px';
        document.querySelector('#page2').className =
          'recruitment-form-container';
      },
    });

    var imgData = canvas.toDataURL('image/png');
    var pdf = new jsPDF('p', 'pt', [canvas.width, canvas.height]);
    var pdfWidth = pdf.internal.pageSize.getWidth();
    var pdfHeight = pdf.internal.pageSize.getHeight();
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.addPage(1);

    var imgData2 = canvas2.toDataURL('image/png');
    var pdfWidth = pdf.internal.pageSize.getWidth();
    var pdfHeight = pdf.internal.pageSize.getHeight();
    pdf.addImage(imgData2, 'PNG', 0, 0, pdfWidth, pdfHeight);

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
        formType: 1,
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
    <div className='recruitment-form-container' id='request-form'>
      <div id='page1'>
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
        <div className='signatureList'>
          {comments.map((comment) => {
            return (
              <>
                <div className='signature-container'>
                  <div>{comment.by}</div>
                  <img src={comment.signature} className='signature-img' />
                  <span>{comment.date}</span>
                </div>
                <div id='approver-comment'> Comment: {comment.msg}</div>
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
        <div className='f-text-area'>
          <span>
            Based on his Qualification and experience, can be taken as
            <div>
              <TextField size='small' variant='standard' fullWidth />
            </div>
            on probation for a period of six months. After completion of his
            probation period, based on his performance, can be taken into
            company’s roll
          </span>
        </div>
      </div>

      <div id='page2'>
        <div className='fitment-details-table'>
          <div className='f-row'>
            <div className='f-col'>Details</div>
            <div className='f-col'>Last drawn Emoluments</div>
            <div className='f-col'>Our Offer Stipend Rs.</div>
          </div>
          <div className='f-row'>
            <div className='f-col'>Basic</div>
            <div className='f-col'></div>
            <div className='f-col'>
              <TextField
                name='basic'
                onChange={onChange}
                value={formData.basic}
                disabled={disabled}
                size='small'
              />
            </div>
          </div>
          <div className='f-row'>
            <div className='f-col'>HRA</div>
            <div className='f-col'></div>
            <div className='f-col'>
              <TextField
                name='hra'
                onChange={onChange}
                value={formData.hra}
                disabled={disabled}
                size='small'
              />
            </div>
          </div>
          <div className='f-row'>
            <div className='f-col'>Conveyance Allowance</div>
            <div className='f-col'></div>
            <div className='f-col'>
              <TextField
                name='conveyanceAllowance'
                onChange={onChange}
                value={formData.conveyanceAllowance}
                disabled={disabled}
                size='small'
              />
            </div>
          </div>
          <div className='f-row'>
            <div className='f-col'>Education Allowance</div>
            <div className='f-col'></div>
            <div className='f-col'>
              <TextField
                name='educationAllowance'
                onChange={onChange}
                value={formData.educationAllowance}
                disabled={disabled}
                size='small'
              />
            </div>
          </div>
          <div className='f-row'>
            <div className='f-col'>Special Allowance</div>
            <div className='f-col'></div>
            <div className='f-col'>
              <TextField
                name='specialAllowance'
                onChange={onChange}
                value={formData.specialAllowance}
                disabled={disabled}
                size='small'
              />
            </div>
          </div>
          <div className='f-row'>
            <div className='f-col'>Leave Travel Allowance</div>
            <div className='f-col'></div>
            <div className='f-col'>
              <TextField
                name='leaveTravelAllowance'
                onChange={onChange}
                value={formData.leaveTravelAllowance}
                disabled={disabled}
                size='small'
              />
            </div>
          </div>
          <div className='f-row'>
            <div className='f-col'>Medical Allowance</div>
            <div className='f-col'></div>
            <div className='f-col'>
              <TextField
                name='medicalAllowance'
                onChange={onChange}
                value={formData.medicalAllowance}
                disabled={disabled}
                size='small'
              />
            </div>
          </div>
          <div className='f-row'>
            <div className='f-col'>Total</div>
            <div className='f-col'></div>
            <div className='f-col'>{getTotal()}</div>
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

export default RecruitmentForm2;
