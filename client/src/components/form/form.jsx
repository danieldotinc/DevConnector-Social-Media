import React, { Component } from "react";
import Select from "./select";
import Input from "./input";
import Submit from "./submit";
import InputGroup from "./inputGroup";
import Textarea from "./textarea";
import Check from "./check";
import Switch from "./switch";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  handleChange = e => {
    const data = { ...this.state.data };
    if (e.target.type == "checkbox") data[e.target.value] = e.target.checked;
    else data[e.target.name] = e.target.value;
    this.setState({ data });
  };

  renderSubmit = (
    name = "submit",
    value = "Submit",
    info = "",
    size = "12",
    classes = "btn btn-info",
    disabled = false
  ) => {
    return (
      <Submit
        type="submit"
        classes={classes}
        size={size}
        info={info}
        name={name}
        value={value}
        disabled={disabled}
      />
    );
  };

  renderInput = (
    name,
    placeholder = "...",
    error = "",
    info = "",
    size = "12",
    type = "text",
    disabled = false,
    onChange = this.handleChange
  ) => {
    const { data } = this.state;
    return (
      <Input
        error={error}
        size={size}
        type={type}
        info={info}
        name={name}
        value={data[name]}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
      />
    );
  };

  renderInputGroup = (
    name,
    placeholder = "...",
    error = "",
    icon = "",
    info = "",
    size = "12",
    type = "text",
    onChange = this.handleChange
  ) => {
    const { data } = this.state;
    return (
      <InputGroup
        error={error}
        icon={icon}
        size={size}
        type={type}
        info={info}
        name={name}
        value={data[name]}
        placeholder={placeholder}
        onChange={onChange}
      />
    );
  };

  renderTextarea = (
    name,
    placeholder = "...",
    error = "",
    info = "",
    size = "12",
    onChange = this.handleChange
  ) => {
    const { data } = this.state;
    return (
      <Textarea
        error={error}
        info={info}
        size={size}
        name={name}
        value={data[name]}
        placeholder={placeholder}
        onChange={onChange}
      />
    );
  };

  renderSelect = (
    name,
    options,
    error,
    info = "",
    size = "12",
    onChange = this.handleChange
  ) => {
    const { data } = this.state;
    return (
      <Select
        name={name}
        size={size}
        info={info}
        error={error}
        options={options}
        value={data[name]}
        onChange={onChange}
      />
    );
  };

  renderCheck = (name, label, size = "12") => {
    const { data } = this.state;
    return (
      <Check
        name={name}
        label={label}
        size={size}
        value={data[name]}
        onChange={this.handleChange}
      />
    );
  };

  renderSwitch = (name, label, size = "12") => {
    const { data } = this.state;
    return (
      <Switch
        name={name}
        label={label}
        size={size}
        value={data[name]}
        onChange={this.handleChange}
      />
    );
  };
}

export default Form;
