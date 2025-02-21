import React, { useState } from "react";
import TextField from "../components/textField";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const handleChange = ({ target }) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    // setData(e.target.name);
    console.log(target.name);
  };
  return (
    <form action="">
      <TextField
        label="Электронная почта"
        name="email"
        value={data.email}
        onChange={handleChange}
      />
      <TextField
        label="Пароль"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
      />
      {/* <div>
        <div>
          <input type="radio" id="radio1" name="radio" />{" "}
          <label htmlFor="radio1">Radio 1</label>
        </div>
        <div>
          <input type="radio" id="radio2" name="radio" />{" "}
          <label htmlFor="radio2">Radio 2</label>
        </div>
      </div> */}
      <button className="btn btn-primary" type="submit">
        Login
      </button>
    </form>
  );
};

export default Login;
