import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles } from "@material-ui/core/styles";
import { Switch as SwitchBox } from "@material-ui/core";

const styles = {
  label: { fontSize: "18px" }
};

const Switch = ({ name, label, size, onChange, value, classes }) => {
  return (
    <div className={`form-group col-${size}`}>
      <FormControlLabel
        control={<SwitchBox onChange={onChange} checked={value} value={name} />}
        label={label}
        classes={{ label: classes.label }}
      />
    </div>
  );
};

export default withStyles(styles)(Switch);
