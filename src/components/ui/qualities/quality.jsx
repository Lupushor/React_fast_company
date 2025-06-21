import React from "react";
import PropTypes from "prop-types";
import { useQuality } from "../../../hooks/useQuality";

const Qualitiy = ({ id }) => {
  const { getQuality } = useQuality();
  const quality = getQuality(id);
  if (!quality) return null; // или можно вернуть заглушку

  const { _id, name, color } = quality;
  return (
    <span className={`badge bg-${color} me-2`} key={_id}>
      {name}
    </span>
  );
};

Qualitiy.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Qualitiy;
