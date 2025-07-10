import React, { useEffect, useState } from "react";
// import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
import * as yup from "yup";
// import { matches, set } from "lodash";

const LoinForm = () => {
  console.log(process.env.REACT_APP_FIREBASE_API_KEY);
  const [data, setData] = useState({ email: "", password: "", stayOn: false });
  const [errors, setErrors] = useState({});

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const validateSchema = yup.object().shape({
    password: yup
      .string()
      .required("Пароль обязателен для заполнения")
      // (вместо .matches(/.{8,}/) используем встроенный метод .min())
      .min(8, "Пароль должен быть не короче 8 символов")
      // Заглавная буква
      .matches(/[A-Z]/, "Пароль должен содержать хотя бы одну заглавную букву")
      // Цифра
      .matches(/\d/, "Пароль должен содержать хотя бы одну цифру")
      // Спецсимвол
      .matches(
        /[!@#$%^&*]/,
        "Пароль должен содержать хотя бы один из специальных символов !@#$%^&*"
      ),
    email: yup
      .string()
      .email("Email is not correct")
      .required("Email is required"),
  });

  // const validatorConfig = {
  //   email: {
  //     isRequired: { message: "Email is required" },
  //     isEmail: { message: "Email is not correct" },
  //   },
  //   password: {
  //     isRequired: { message: "Password is required" },
  //     isCapitalSymbol: {
  //       message: "Password must contain at least one capital letter",
  //     },
  //     isContainDigit: { message: "Password must contain at least one digit" },
  //     min: { message: "Password must contain at least 8 characters", value: 8 },
  //   },
  // };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    // const errors = validator(data, validatorConfig);
    validateSchema
      .validate(data)
      .then(() => setErrors({}))
      .catch((err) => setErrors({ [err.path]: err.message }));
    // setErrors(errors);
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

      <CheckBoxField value={data.stayOn} onChange={handleChange} name="stayOn">
        Оставаться в системе
      </CheckBoxField>
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

export default LoinForm;
