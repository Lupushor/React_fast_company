import React from "react";
import PropTypes from "prop-types";

const SelectField = ({
  label,
  value,
  onChange,
  defaultOption,
  options,
  error,
}) => {
  const optionsArray =
    !Array.isArray(options) && typeof options === "object"
      ? Object.keys(options).map((optionName) => ({
          name: options[optionName].name,
          value: options[optionName]._id,
        }))
      : options;
  return (
    <div className="mb-4">
      <label htmlFor="validationCustom04" className="form-label">
        {label}
      </label>
      <select
        className={`form-select ${error ? "is-invalid" : ""}`}
        name="profession"
        id="validationCustom04"
        value={value}
        onChange={onChange}
      >
        <option disabled value="">
          {defaultOption}
        </option>
        {optionsArray &&
          optionsArray.map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultOption: PropTypes.string,
  options: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  error: PropTypes.string,
};

export default SelectField;
