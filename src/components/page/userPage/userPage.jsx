import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import API from "../../../api";
import Qualities from "../../ui/qualities";
import { useHistory } from "react-router-dom";

const UserPage = ({ userId }) => {
  const history = useHistory();
  const [user, setUser] = useState();
  useEffect(() => {
    API.users.getById(userId).then((data) => setUser(data));
  }, []);

  const handleClick = () => {
    history.push(history.location.pathname + "/edit");
  };

  if (user) {
    return (
      <div>
        <h1>{user.name} </h1>
        <h2>Профессия: {user.profession.name}</h2>
        <Qualities qualities={user.qualities} />
        <p>completedMeetings: {user.completedMeetings}</p>
        <h3>Rate: {user.rate}</h3>
        <button className="btn btn-primary" onClick={handleClick}>
          Изменить
        </button>
      </div>
    );
  } else {
    <h1>Loading...</h1>;
  }
};

UserPage.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default UserPage;
