import React from "react";
import PropTypes from "prop-types";
import User from "./user";

const UserTable = ({ users, onSort, ...rest }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th onClick={() => onSort("name")} scope="col">
            Имя
          </th>
          <th scope="col">Качества</th>
          <th onClick={() => onSort("profession.name")} scope="col">
            Профессия
          </th>
          <th onClick={() => onSort("completedMeetings")} scope="col">
            Встретился, раз
          </th>
          <th onClick={() => onSort("rate")} scope="col">
            Оценка
          </th>
          <th onClick={() => onSort("bookmark")} scope="col">
            Избранное
          </th>
          <th />
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <User key={user._id} {...rest} {...user} index={index} />
        ))}
      </tbody>
    </table>
  );
};

UserTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
};

export default UserTable;
