import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ status, ...rest }) => {
  return (
    <button {...rest}>
      <i className={`bi bi-bookmark${status ? "-check-fill" : ""}`}></i>
    </button>
  );
};

Bookmark.propTypes = {
  status: PropTypes.bool.isRequired,
};

export default Bookmark;
