import React from "react";

const Input = ({ error, size, onChange, info, ...rest }) => {
  return (
    <div className={`form-group col-${size}`}>
      <input
        {...rest}
        className={`form-control form-control-lg ${error && "is-invalid"}`}
        onChange={onChange}
        onInvalid={onChange}
        onInput={onChange}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      <div className="invalid-feedback">{error}</div>
    </div>
  );
};

export default Input;
