import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({ options, onChange, name, label, defaultValue }) => {
  const optionsArray =
    !Array.isArray(options) && typeof options === "object"
        ? Object.values(options)
        : options;

  const handleChange = (value) => {
    onChange({ name: name, value });
  };
  return (
    <div className="mb-4">
      <label className="form-label">
        {label}
        <Select
          isMulti
          closeMenuOnSelect={false}
          defaultValue={defaultValue}
          options={optionsArray}
          className="basic-multi-select mb-3"
          classNamePrefix="select"
          placeholder="Choose..."
          onChange={handleChange}
          name={name}
        />
      </label>
    </div>
  );
};

MultiSelectField.propTypes = {
  options: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.array,
};

export default MultiSelectField;
