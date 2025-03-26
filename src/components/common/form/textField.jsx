import React, { useState } from "react";
import PropTypes from "prop-types";

const TextField = ({ label, type, name, value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="mb-4">
      <label htmlFor={name}>{label}</label>
      <div className="input-group has-validation">
        <input
          id={name}
          type={showPassword ? "text" : type}
          value={value}
          onChange={handleChange}
          name={name}
          className={`form-control ${error ? "is-invalid" : ""}`}
        />
        {type === "password" && (
          <div className="input-group-append">
            <span
              className="input-group-text"
              onClick={toggleShowPassword}
              style={{ cursor: "pointer" }}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
        )}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

TextField.defaultProps = {
  type: "text",
};

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default TextField;
