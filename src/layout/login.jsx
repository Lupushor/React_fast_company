import React from "react";

const Login = () => {
  return (
    <form action="">
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" />
      </div>
    </form>
  );
};
export default Login;
