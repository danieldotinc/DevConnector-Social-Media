import React, { Component } from "react";
import PropTypes from "prop-types";

const TextFieldGroup = ({
  error,
  info,
  name,
  value,
  onChange,
  type,
  placeholder,
  label,
  disabled
}) => {
  return (
    <div className="form-group">
      <input
        className={`form-control form-control-lg ${error && "is-invalid"}`}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      <div className="invalid-feedback">{error}</div>
    </div>
  );
};

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  disabled: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

TextFieldGroup.defaultProps = {
  type: "text",
  placeholder: "...",
  disabled: false
};

export default TextFieldGroup;
