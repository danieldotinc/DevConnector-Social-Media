import React from "react";

const Submit = ({ size, info, classes, ...rest }) => {
  return (
    <div className={`form-group col-${size}`}>
      <input {...rest} className={`form-control form-control-lg ${classes}`} />
      {info && <small className="form-text text-muted">{info}</small>}
    </div>
  );
};

export default Submit;
