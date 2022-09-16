import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import "./index.scss";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className='not-found'>
      <Button variant='contained' color='primary' onClick={() => navigate("/")}>
        Page not Found, Click here to Go Home
      </Button>
    </div>
  );
};
export default NotFound;
