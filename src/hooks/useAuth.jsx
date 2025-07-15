import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import { setTokens } from "../services/localStorege.service";

const httpAuth = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/",
  params: {
    key: process.env.REACT_APP_FIREBASE_API_KEY,
  },
});

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setUser] = useState({});
  const [error, setError] = useState(null);

  async function logIn({ email, password }) {
    try {
      const { data } = await httpAuth.post(`accounts:signInWithPassword`, {
        email,
        password,
        returnSecureToken: true,
      });

      setTokens(data);

      // const { content } = await userService.getByEmail(email);
      // setUser(content);
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      console.log(code, message);
      if (code === 400 && message === "INVALID_LOGIN_CREDENTIALS") {
        throw new Error("Email or password is incorrect");
      }

      if (code === 400 && message === "TOO_MANY_ATTEMPTS_TRY_LATER") {
        throw new Error("User is disabled");
      }

      // if (code === 400 && message === "INVALID_PASSWORD") {
      //   const errorObject = {
      //     password: "Password is incorrect",
      //   };
      //   throw errorObject;
      // }
    }
  }

  async function signUp({ email, password, ...rest }) {
    try {
      const { data } = await httpAuth.post(`accounts:signUp`, {
        email,
        password,
        returnSecureToken: true,
      });

      setTokens(data);

      await createUser({
        _id: data.localId,
        email,
        ...rest,
      });

      // Here you would typically handle the sign-up logic, e.g., API call
    } catch (error) {
      errorCatcher(error);
    }

    const { code, message } = error.response.data.error;
    if (code === 400 && message === "EMAIL_EXISTS") {
      const errorObject = {
        email: "Email is already exist",
      };
      throw errorObject;
    }
  }

  async function createUser(data) {
    try {
      const { content } = userService.create(data);
      setUser(content);
    } catch (error) {
      errorCatcher(error);
    }
  }

  function errorCatcher(error) {
    const { message } = error.response
      ? error.response.data
      : { message: "An error occurred" };
    setError(message);
  }

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  return (
    <AuthContext.Provider value={{ signUp, logIn, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default AuthProvider;
