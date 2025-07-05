import React from "react";
import PropTypes from "prop-types";

const SelectField = ({
  label,
  value,
  onChange,
  defaultOption,
  options,
  error,
  name,
}) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  const optionsArray =
    !Array.isArray(options) && typeof options === "object"
      ? Object.values(options)
      : options;

  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        className={`form-select ${error ? "is-invalid" : ""}`}
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
      >
        <option disabled value="">
          {defaultOption}
        </option>

        {optionsArray.length > 0 &&
          optionsArray.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
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
