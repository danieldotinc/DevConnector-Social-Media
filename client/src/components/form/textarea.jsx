import React from "react";

const Textarea = ({ error, size, onChange, ...rest }) => {
  return (
    <div className={`form-group col-${size}`}>
      <textarea
        {...rest}
        className={`form-control form-control-lg ${error && "is-invalid"}`}
        onChange={onChange}
        onInvalid={onChange}
        onInput={onChange}
      />
      <div className="invalid-feedback">{error}</div>
    </div>
  );
};

export default Textarea;
