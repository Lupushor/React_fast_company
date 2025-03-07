import React from "react";
import PropTypes from "prop-types";
// import API from "../api";

const SearchStatus = ({ length }) => {
  const renderPhrese = (number) => {
    const lastNumber = number % 100;
    if (lastNumber >= 11 && lastNumber <= 14) {
      return "человек тусанет с тобой сегодня";
    }

    const remainder = number % 10;
    if (remainder === 1) {
      return "человек тусанет с тобой сегодня";
    }

    if (remainder >= 2 && remainder <= 4) {
      return "человека тусанут с тобой сегодня";
    }

    return "человек тусанет с тобой сегодня";
  };

  return (
    <h3>
      <span className={`badge bg-${length > 0 ? `primary` : `danger`} me-2`}>
        {length > 0
          ? `${length} ${renderPhrese(length)}`
          : `Никто с тобой не тусанет`}
      </span>
    </h3>
  );
};

SearchStatus.propTypes = {
  length: PropTypes.number.isRequired,
};

export default SearchStatus;
