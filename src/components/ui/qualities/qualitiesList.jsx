import React from "react";
import PropTypes from "prop-types";
import Qualitiy from "./qualitiy";

const QualitiesList = ({ qualities }) => {
  return (
    <>
      {qualities.map((quality) => (
        <Qualitiy key={quality._id} {...quality} />
      ))}
    </>
  );
};

QualitiesList.propTypes = {
  qualities: PropTypes.array.isRequired,
};

export default QualitiesList;
