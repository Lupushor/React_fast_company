import React from "react";
import PropTypes from "prop-types";

const GroupList = ({
  items,
  valueProperty = "_id",
  contentProperty = "name",
  onItemSelect,
  selectedItem,
}) => {
  const keys = Array.isArray(items) ? items : Object.keys(items);

  return (
    <ul className="list-group">
      {keys.map((item) => {
        const currentItem = Array.isArray(items) ? item : items[item];
        return (
          <li
            key={currentItem[valueProperty]}
            className={
              "list-group-item" +
              (currentItem === selectedItem ? " active" : "")
            }
            onClick={() => onItemSelect(currentItem)}
            role="button"
          >
            {currentItem[contentProperty]}
          </li>
        );
      })}
    </ul>
  );
};

GroupList.propTypes = {
  // items: PropTypes.object.isRequired,
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onItemSelect: PropTypes.func,
  valueProperty: PropTypes.string,
  contentProperty: PropTypes.string,
  selectedItem: PropTypes.object,
};

export default GroupList;
