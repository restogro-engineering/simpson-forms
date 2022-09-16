/** @format */

import React, { useEffect, useState } from 'react';
import './index.scss';
import Select from 'react-select';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Button, IconButton, TextField } from '@mui/material';
import {
  TICKET_SEVERITY,
  TICKET_STAGES,
  EXTENDED_TECH_SUPPORT_OPTIONS,
} from '../../utils/constants';
import { useParams } from 'react-router-dom';
import { HTTP_METHODS, invokeApi } from '../../utils/http-service';
import { HOSTNAME, REST_URLS } from '../../utils/endpoints';
import { REASONS_FOR_ENGINE_REPLACEMENT } from './helper';
import RowRadioButtonsGroup from '../../core/radio-group';
import SiFileUpload from '../../core/file-uploader';
import CustomModal from '../../core/modal';
import { toast } from 'react-toastify';
const FormDetails = ({
  loadData,
  ticketDetails = {},
  codes,
  parts,
  serviceEngineers,
}) => {
  const { id } = useParams();
  const [engineer, setEngineer] = useState({});
  const [defectCode, setDefectCode] = useState({});
  const [comment, setComment] = useState('');
  const [engineNo, setEngineNo] = useState('');
  const [invoiceDate, setInvoiceDate] = useState(null);
  const [engineReplacementPayload, setEngineReplacementPayload] = useState({
    replacementBy: '',
    engineType: '',
    engineTypeValue: null,
    extraText: '',
  });
  const [partReplacementPayload, setPartReplacementPayload] = useState({
    mode: '',
    scope: '',
    listOfParts: [],
    extra: '',
  });

  const [openModal, setOpenModal] = useState(null);
  const [message, setMessage] = useState('');

  const updateDateOfInspection = (payload) => {
    invokeApi(
      HTTP_METHODS.PUT,
      `${HOSTNAME}${REST_URLS.TICKETS}/${id}`,
      payload
    ).then((response) => {
      if (response?.message) {
        toast.error('Update Failed');
      } else {
        loadData();
      }
    });
  };
  const updateEngineDetails = (payload) => {
    invokeApi(
      HTTP_METHODS.PUT,
      `${HOSTNAME}${REST_URLS.ENTER_ENGINE_DETAILS}/${id}`,
      payload
    ).then((response) => {
      if (response?.message) {
        toast.error('Update Failed');
      } else {
        loadData();
      }
    });
  };

  const addComments = () => {
    invokeApi(HTTP_METHODS.POST, `${HOSTNAME}${REST_URLS.COMMENT}/${id}`, {
      comment,
    }).then((response) => {
      if (response?.message) {
        toast.error('Update Failed');
      } else {
        setComment('');
        loadData();
      }
    });
  };

  const assignEngineer = () => {
    invokeApi(HTTP_METHODS.PUT, `${HOSTNAME}${REST_URLS.ASSIGN_SE}/${id}`, {
      serviceEngineerId: engineer.id,
    }).then((response) => {
      if (response?.message) {
        toast.error('Update Failed');
      } else {
        setEngineer({});
        loadData();
      }
    });
  };

  const updateDefectCode = (type) => {
    invokeApi(HTTP_METHODS.PUT, `${HOSTNAME}${REST_URLS.DEFECT_ACTION}/${id}`, {
      code: defectCode.id,
      type: type,
    }).then((response) => {
      setDefectCode({});
      loadData();
    });
  };

  const updateOutOfWarranty = () => {
    invokeApi(
      HTTP_METHODS.PUT,
      `${HOSTNAME}${REST_URLS.OUT_OF_WARRANTY}/${id}`,
      {
        action: 'EXTENDED_TECH_SUPPORT',
        value: defectCode.value,
        comment: '',
        attachment: '',
      }
    ).then((response) => {
      setDefectCode({});
      loadData();
    });
  };

  const updateActionCode = () => {
    if (defectCode.code === 'A002') {
      engineReplacement();
    } else if (defectCode.code === 'A003') {
      partReplacement();
    }
    updateDefectCode('action');
  };

  const engineReplacement = () => {
    invokeApi(
      HTTP_METHODS.PUT,
      `${HOSTNAME}${REST_URLS.A002_ACTION}/${id}`,
      engineReplacementPayload
    ).then((response) => {
      setEngineReplacementPayload({
        replacementBy: '',
        engineType: '',
        engineTypeValue: null,
        extraText: '',
      });
    });
  };

  const partReplacement = () => {
    let payload = partReplacementPayload;
    payload.listOfParts = partReplacementPayload.listOfParts.map(
      (l) => l.description
    );
    invokeApi(
      HTTP_METHODS.PUT,
      `${HOSTNAME}${REST_URLS.A003_ACTION}/${id}`,
      payload
    ).then((response) => {
      setPartReplacementPayload({
        mode: '',
        scope: '',
        listOfParts: [],
        extra: '',
      });
    });
  };

  const getActionCode002Elements = () => {
    return (
      <div>
        <RowRadioButtonsGroup
          label='Replacement By'
          options={['simpsons', 'oem']}
          value={engineReplacementPayload.replacementBy}
          onChange={(event) => {
            setEngineReplacementPayload({
              ...engineReplacementPayload,
              replacementBy: event.target.value,
            });
          }}
        />
        {engineReplacementPayload.replacementBy === 'simpsons' && (
          <RowRadioButtonsGroup
            label='Engine Type'
            options={['new_engine', 'float_engine']}
            value={engineReplacementPayload.engineType}
            onChange={(event) => {
              setEngineReplacementPayload({
                ...engineReplacementPayload,
                engineType: event.target.value,
              });
            }}
          />
        )}
        {engineReplacementPayload.replacementBy === 'oem' && (
          <RowRadioButtonsGroup
            label='Engine Type'
            options={['from_oem_plant', 'through_spd_mode', 'from_oem_deposit']}
            value={engineReplacementPayload.engineType}
            onChange={(event) => {
              setEngineReplacementPayload({
                ...engineReplacementPayload,
                engineType: event.target.value,
              });
            }}
          />
        )}
        {engineReplacementPayload.engineType &&
          engineReplacementPayload.engineTypeValue !== 'float_engine' &&
          REASONS_FOR_ENGINE_REPLACEMENT[
            engineReplacementPayload.engineType
          ] && (
            <RowRadioButtonsGroup
              label='Reason for engine replacement'
              options={
                REASONS_FOR_ENGINE_REPLACEMENT[
                  engineReplacementPayload.engineType
                ]
              }
              value={engineReplacementPayload.engineTypeValue}
              onChange={(event) => {
                setEngineReplacementPayload({
                  ...engineReplacementPayload,
                  engineTypeValue: event.target.value,
                });
              }}
            />
          )}

        {engineReplacementPayload.engineType === 'float_engine' ||
          (engineReplacementPayload.engineType === 'from_oem_deposit' && (
            <div>
              <div className='drop-down-label'>Replacement engine Sl. No</div>
              <TextField
                fullWidth
                size='small'
                value={engineReplacementPayload.engineTypeValue}
                onChange={(event) => {
                  setEngineReplacementPayload({
                    ...engineReplacementPayload,
                    engineTypeValue: event.target.value,
                  });
                }}
              />
            </div>
          ))}

        {engineReplacementPayload.engineType && (
          <div>
            <div className='drop-down-label'>Extra info</div>
            <TextField
              fullWidth
              size='small'
              value={engineReplacementPayload.extraText}
              onChange={(event) => {
                setEngineReplacementPayload({
                  ...engineReplacementPayload,
                  extraText: event.target.value,
                });
              }}
            />
          </div>
        )}
        <div className='a002-buttons'>
          <Button
            fullWidth
            variant='contained'
            color='primary'
            size='small'
            disabled={!defectCode.code}
            onClick={updateActionCode}
          >
            Update details
          </Button>
        </div>
      </div>
    );
  };
  const getActionCode003Elements = () => {
    return (
      <div>
        <RowRadioButtonsGroup
          label='Replacement Mode'
          options={['under_warranty', 'goodwill_warranty']}
          value={partReplacementPayload.mode}
          onChange={(event) => {
            setPartReplacementPayload({
              ...partReplacementPayload,
              mode: event.target.value,
            });
          }}
        />
        <RowRadioButtonsGroup
          label='Scope'
          options={['simpsons', 'oem']}
          value={partReplacementPayload.scope}
          onChange={(event) => {
            setPartReplacementPayload({
              ...partReplacementPayload,
              scope: event.target.value,
            });
          }}
        />

        <div>
          <div className='drop-down-label'>Parts list </div>
          <Select
            isMulti
            value={partReplacementPayload.listOfParts}
            classNamePrefix='si-select'
            options={parts}
            getOptionLabel={(op) => op.description}
            getOptionValue={(op) => op.id}
            onChange={(event) => {
              setPartReplacementPayload({
                ...partReplacementPayload,
                listOfParts: event,
              });
            }}
          />
        </div>

        <div>
          <div className='drop-down-label'>Extra info</div>
          <TextField
            fullWidth
            size='small'
            value={partReplacementPayload.extra}
            onChange={(event) => {
              setPartReplacementPayload({
                ...partReplacementPayload,
                extra: event.target.value,
              });
            }}
          />
        </div>
        <div className='a002-buttons'>
          <Button
            fullWidth
            variant='contained'
            color='primary'
            size='small'
            disabled={!defectCode.code}
            onClick={updateActionCode}
          >
            Update details
          </Button>
        </div>
      </div>
    );
  };
  const getStageForm = () => {
    switch (ticketDetails.stage) {
      case TICKET_STAGES.ASSIGN_SE:
        return (
          <>
            <div>
              <div className='drop-down-label'>Action to be taken</div>
              <Select
                placeholder='Select engineer'
                value={(engineer.id && engineer) || ''}
                classNamePrefix='si-select'
                options={serviceEngineers}
                getOptionLabel={(op) => op.name}
                getOptionValue={(op) => op.id}
                onChange={(value) => setEngineer(value)}
              />
            </div>
            <div>
              <Button
                fullWidth
                variant='contained'
                color='primary'
                size='small'
                disabled={!engineer.id}
                onClick={assignEngineer}
              >
                Update details
              </Button>
            </div>
          </>
        );
      case TICKET_STAGES.ENTER_ENGINE_DETAILS:
        return (
          <>
            <div>
              <div className='drop-down-label'>Action to be taken</div>
              <TextField
                fullWidth
                size='small'
                value={(ticketDetails.stage || '').split('_').join(' ')}
                disabled
              />
            </div>
            <div>
              <div className='drop-down-label'> Engine Number</div>
              <TextField
                fullWidth
                size='small'
                value={engineNo}
                onChange={(e) => setEngineNo(e.target.value)}
              />
            </div>
            <div>
              <div className='drop-down-label'> Invoice Date</div>
              <TextField
                fullWidth
                type='date'
                size='small'
                value={invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
              />
            </div>
            <div>
              <Button
                fullWidth
                variant='contained'
                color='primary'
                size='small'
                disabled={!engineNo}
                onClick={() => {
                  updateEngineDetails({ engineNo, invoiceDate });
                }}
              >
                Update details
              </Button>
            </div>
          </>
        );
      case TICKET_STAGES.UPDATE_DEFECT_CODE:
        return (
          <>
            <div>
              <div className='drop-down-label'> Action to be taken</div>
              <Select
                placeholder='Select Defect Code'
                value={(defectCode.code && defectCode) || ''}
                classNamePrefix='si-select'
                options={codes}
                getOptionLabel={(op) => op.description}
                getOptionValue={(op) => op.code}
                onChange={(value) => setDefectCode(value)}
              />
            </div>
            <div>
              <Button
                fullWidth
                variant='contained'
                color='primary'
                size='small'
                disabled={!defectCode.code}
                onClick={() => updateDefectCode('defect')}
              >
                Update details
              </Button>
            </div>
          </>
        );

      case TICKET_STAGES.UPDATE_ACTION_CODE:
        return (
          <>
            <div>
              <div className='drop-down-label'>Action to be taken</div>
              <Select
                value={(defectCode.code && defectCode) || null}
                placeholder='Select Action Code'
                classNamePrefix='si-select'
                options={codes}
                getOptionLabel={(op) => op.description}
                getOptionValue={(op) => op.code}
                onChange={(value) => setDefectCode(value)}
              />
            </div>
            {defectCode.code === 'A002' && getActionCode002Elements()}
            {defectCode.code === 'A003' && getActionCode003Elements()}

            {defectCode.code !== 'A002' && defectCode.code !== 'A003' && (
              <div>
                <Button
                  fullWidth
                  variant='contained'
                  color='primary'
                  size='small'
                  disabled={!defectCode.code}
                  onClick={() => updateDefectCode('action')}
                >
                  Update details
                </Button>
              </div>
            )}
          </>
        );
      case TICKET_STAGES.OUT_OF_WARRANTY:
        return (
          <>
            <div>
              <div className='drop-down-label'>Action to be taken</div>
              <Select
                value={(defectCode.label && defectCode) || null}
                placeholder='Extent tech support'
                classNamePrefix='si-select'
                options={EXTENDED_TECH_SUPPORT_OPTIONS}
                onChange={(value) => setDefectCode(value)}
              />
            </div>

            <div>
              <Button
                fullWidth
                variant='contained'
                color='primary'
                size='small'
                disabled={!defectCode.label}
                onClick={() => updateOutOfWarranty()}
              >
                Update details
              </Button>
            </div>
          </>
        );
    }
  };

  return (
    <div className='form-details-container'>
      <div className='severity'>
        <div>Ticket Severity</div>
        <Select
          value={TICKET_SEVERITY.find(
            (t) => t.value === ticketDetails.severity
          )}
          classNamePrefix='si-select'
          options={TICKET_SEVERITY}
          onChange={(value) => {
            updateDateOfInspection({
              severity: value.value,
            });
          }}
        />
      </div>
      <div className='action-form'>
        {getStageForm()}
        <div className='comments-section'>
          <TextareaAutosize
            minRows={5}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={{
              width: '99%',
            }}
          />
          <div className='add-comment-bts'>
            <Button
              variant='contained'
              color='primary'
              size='small'
              onClick={addComments}
              disabled={!comment}
            >
              Add Comment
            </Button>
            <SiFileUpload id={id} callBack={loadData} />
          </div>
        </div>
        <div className='buttons-container'>
          {(ticketDetails.status === 'RESOLVED' ||
            ticketDetails.status === 'CLOSED') && (
            <Button
              variant='contained'
              color='primary'
              size='small'
              onClick={() =>
                updateDateOfInspection({
                  status: 'REOPENED',
                })
              }
            >
              Reopen ticket
            </Button>
          )}
          {(ticketDetails.status === 'OPENED' ||
            ticketDetails.status === 'REOPENED') && (
            <Button
              variant='contained'
              color='primary'
              size='small'
              onClick={() => setOpenModal(true)}
            >
              Resolve Ticket
            </Button>
          )}

          <Button
            variant='outlined'
            color='primary'
            size='small'
            disabled={
              ticketDetails.status === 'RESOLVED' ||
              ticketDetails.status === 'CLOSED'
            }
            onClick={() => updateDateOfInspection({ status: 'CLOSED' })}
          >
            Close ticket
          </Button>
        </div>
      </div>
      {openModal && (
        <CustomModal
          title='Resolve ticket'
          onClose={() => {
            setOpenModal(false);
            setMessage('');
          }}
        >
          <div className='resolve-msg'>
            <TextField
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              fullWidth
              size='small'
              multiline
              rows={4}
              placeholder='Resolve message'
            />

            <Button
              variant='contained'
              color='primary'
              size='small'
              fullWidth
              onClick={() => {
                setMessage('');
                setOpenModal(false);
                updateDateOfInspection({
                  status: 'RESOLVED',
                  resolveMessage: message,
                });
              }}
            >
              {ticketDetails.status === 'RESOLVED' ||
              ticketDetails.status === 'CLOSED'
                ? 'Reopen ticket'
                : 'Resolve ticket'}
            </Button>
          </div>
        </CustomModal>
      )}
    </div>
  );
};

export default FormDetails;
