import React from "react";
import PropTypes from "prop-types";

const Qualitiy = ({ color, name }) => {
  return <span className={`badge bg-${color} me-2`}>{name}</span>;
};

Qualitiy.propTypes = {
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Qualitiy;
