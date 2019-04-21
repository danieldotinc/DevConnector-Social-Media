import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles } from "@material-ui/core/styles";
import { Checkbox } from "@material-ui/core";

const styles = {
  label: { fontSize: "18px" }
};

const Check = ({ name, label, size, onChange, value, classes }) => {
  return (
    <div className={`form-group col-${size}`}>
      <FormControlLabel
        control={<Checkbox onChange={onChange} checked={value} value={name} />}
        label={label}
        classes={{ label: classes.label }}
      />
    </div>
  );
};

export default withStyles(styles)(Check);
