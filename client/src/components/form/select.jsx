import React from "react";
import uuid from "uuid";

const Select = ({ name, info, error, value, options, size, onChange }) => {
  return (
    <div className={`form-group col-${size}`}>
      <select
        className={`form-control form-control-lg ${error && "is-invalid"}`}
        name={name}
        value={value}
        onChange={onChange}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {info && <small className="form-text text-muted">{info}</small>}
      <div className="invalid-feedback">{error}</div>
    </div>
  );
};

export default Select;
