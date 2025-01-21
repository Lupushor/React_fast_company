import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ onSort, selectedSort, columns }) => {
  const handleSort = (item) => {
    onSort({
      path: item,
      order: selectedSort.order === "asc" ? "desc" : "asc",
    });
  };

  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (
          <th
            key={column}
            onClick={
              columns[column].path
                ? () => handleSort(columns[column].path)
                : undefined
            }
            //1 вариант
            {...{ role: columns[column].path && "button" }} //распаковывает объект в атрибуты и можно использовать для нескольких атрибутов
            //2 вариант
            // role={columns[column].path && "button"} - если columns[column].path не равен undefined, то role = "button", иначе role = undefined (аналогично, работает для одного атрибута)
            scope="col"
          >
            {columns[column].name}
            {columns[column].path && (
              <i
                className={
                  "bi bi-caret-" +
                  (selectedSort.path === columns[column].path
                    ? selectedSort.order === "asc"
                      ? "up"
                      : "down"
                    : "") +
                  "-fill"
                }
              ></i>
            )}
          </th>

          // className={
          //   "list-group-item" +
          //   (currentItem === selectedItem ? " active" : "")
          // }
        ))}
        {/* <th scope="col">#</th> */}
        {/* <th onClick={() => handleSort("name")} scope="col">
          Имя
        </th>
        <th scope="col">Качества</th>
        <th onClick={() => handleSort("profession.name")} scope="col">
          Профессия
        </th>
        <th onClick={() => handleSort("completedMeetings")} scope="col">
          Встретился, раз
        </th>
        <th onClick={() => handleSort("rate")} scope="col">
          Оценка
        </th>
        <th onClick={() => handleSort("bookmark")} scope="col">
          Избранное
        </th>
        <th /> */}
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired,
};

export default TableHeader;
