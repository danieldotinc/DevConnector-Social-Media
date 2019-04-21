import React from "react";

const InputGroup = ({ error, size, onChange, info, icon, ...rest }) => {
  return (
    <div className={`input-group mb-3 col-${size}`}>
      <div className="input-group-prepend">
        <div className="input-group-text">
          <i className={icon} />
        </div>
      </div>
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

export default InputGroup;
