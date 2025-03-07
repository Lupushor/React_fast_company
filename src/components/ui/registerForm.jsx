import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";

const RegisterForm = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = ({ target }) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    // setData(e.target.name);
    console.log(target.name);
  };

  const validatorConfig = {
    email: {
      isRequired: { message: "Email is required" },
      isEmail: { message: "Email is not correct" },
    },
    password: {
      isRequired: { message: "Password is required" },
      isCapitalSymbol: {
        message: "Password must contain at least one capital letter",
      },
      isContainDigit: { message: "Password must contain at least one digit" },
      min: { message: "Password must contain at least 8 characters", value: 8 },
    },
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    console.log(e);

    e.preventDefault();

    const isValidate = validate();
    if (!isValidate) return;

    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Электронная почта"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Пароль"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
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
      <button
        className="btn btn-primary w-100 mx-auto"
        type="submit"
        disabled={!isValid}
      >
        Login
      </button>
    </form>
  );
};

export default RegisterForm;
