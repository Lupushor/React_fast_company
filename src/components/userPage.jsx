import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import API from "../api";
import QualitiesList from "./qualitiesList";
import { useHistory } from "react-router-dom";

const UserPage = ({ userId }) => {
  const history = useHistory();
  const [user, setUser] = useState();
  useEffect(() => {
    API.users.getById(userId).then((data) => setUser(data));
  }, []);

  const handleClick = () => {
    history.push("/users");
  };

  if (user) {
    return (
      <div>
        <h1>{user.name} </h1>
        <h2>Профессия: {user.profession.name}</h2>
        <QualitiesList qualities={user.qualities} />
        <p>completedMeetings: {user.completedMeetings}</p>
        <h3>Rate: {user.rate}</h3>
        <button className="btn btn-primary" onClick={handleClick}>
          All Users
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
