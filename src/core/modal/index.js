import React, { useEffect } from "react";
import PropTypes from "prop-types";
import CancelIcon from "@mui/icons-material/Cancel";
import "./index.scss";
import { IconButton } from "@mui/material";

const CustomModal = ({ title, children, onClose, contentClassName }) => {
  // to disable the scroll on body
  useEffect(() => {
    let element = document.getElementsByTagName("body");
    if (element && element.length > 0) {
      element[0].style.overflow = "hidden";
    }
    return () => {
      if (element && element.length > 0) {
        element[0].style.overflow = "scroll";
      }
    };
  });

  return (
    <div className='custom-modal-container'>
      <div className={`${contentClassName} modal-content`}>
        {title && (
          <div className='modal-header'>
            <span className='modal-title'>{title}</span>
            {onClose && (
              <IconButton className='close' onClick={onClose}>
                <CancelIcon style={{ color: "#fff", fontSize: 30 }} />
              </IconButton>
            )}
          </div>
        )}
        <div className='modal-body'>{children}</div>
      </div>
    </div>
  );
};

CustomModal.defaultProps = {};
CustomModal.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func
};

export default CustomModal;
