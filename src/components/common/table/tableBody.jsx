import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

// const TableBody = ({ data, columns }) => {
//   return (
//     <tbody>
//       {data.map((item) => (
//         <tr>
//           {Object.keys(columns).map((column) => (
//             <td>{item[columns[column].path]}</td>
//           ))}
//         </tr>
//       ))}
//     </tbody>
//   );
// };

const TableBody = ({ data, columns }) => {
  const renderContent = (item, column) => {
    if (columns[column].component) {
      const component = columns[column].component;
      if (typeof component === "function") {
        return component(item);
      }
      return component;
    }
    return _.get(item, columns[column].path);
  };

  return (
    <tbody>
      {data.map((item, index) => (
        <tr key={item._id}>
          {Object.keys(columns).map((column) => (
            <td key={column}>
              {columns[column].name === "#"
                ? index + 1
                : renderContent(item, column)}
              {/* Этот код отображает строку таблицы для каждого элемента в массиве данных.
                  Для каждого столбца он проверяет, определен ли пользовательский компонент в объекте columns.
                  Если пользовательский компонент определен, он отображает этот компонент.
                  В противном случае он извлекает значение из объекта item, используя путь, указанный в объекте columns. */}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

TableBody.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.object.isRequired,
};

export default TableBody;
