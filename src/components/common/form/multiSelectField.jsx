import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({ options, onChange, name }) => {
  const optionsArray =
    !Array.isArray(options) && typeof options === "object"
      ? Object.keys(options).map((optionName) => ({
          label: options[optionName].name,
          value: options[optionName]._id,
        }))
      : options;

  return (
    <Select
      isMulti
      options={optionsArray}
      className="basic-multi-select mb-3"
      classNamePrefix="select"
      placeholder="Choose..."
      onChange={onChange}
      name={name}
    />
  );
};

MultiSelectField.propTypes = {
  options: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default MultiSelectField;
