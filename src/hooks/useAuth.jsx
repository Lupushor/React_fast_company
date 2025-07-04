import React, { useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  async function signUp({ email, password }) {
    const key = "AIzaSyC7MoXTfOZzhFDltsOeZDhrda2G_mPSPbA";
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`;
    const { data } = await axios.post(url, {
      email,
      password,
      returnSecureToken: true,
    });
    console.log(data);
    // Here you would typically handle the sign-up logic, e.g., API call
  }

  return (
    <AuthContext.Provider value={{ signUp }}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default AuthProvider;
