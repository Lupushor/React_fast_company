import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
// import * as yup from "yup";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";

const LoinForm = () => {
  const [data, setData] = useState({ email: "", password: "", stayOn: false });
  const [errors, setErrors] = useState({});
  const [enterErrorr, setEnterError] = useState(null);

  const history = useHistory();

  const { logIn } = useAuth();

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    setEnterError(null);
  };

  // const validateSchema = yup.object().shape({
  //   password: yup
  //     .string()
  //     .required("Пароль обязателен для заполнения")
  //     // (вместо .matches(/.{8,}/) используем встроенный метод .min())
  //     .min(8, "Пароль должен быть не короче 8 символов")
  //     // Заглавная буква
  //     .matches(/[A-Z]/, "Пароль должен содержать хотя бы одну заглавную букву")
  //     // Цифра
  //     .matches(/\d/, "Пароль должен содержать хотя бы одну цифру")
  //     // Спецсимвол
  //     .matches(
  //       /[!@#$%^&*]/,
  //       "Пароль должен содержать хотя бы один из специальных символов !@#$%^&*"
  //     ),
  //   email: yup
  //     .string()
  //     .email("Email is not correct")
  //     .required("Email is required"),
  // });

  const validatorConfig = {
    email: {
      isRequired: { message: "Email is required" },
      // isEmail: { message: "Email is not correct" },
    },
    password: {
      isRequired: { message: "Password is required" },
      // isCapitalSymbol: {
      //   message: "Password must contain at least one capital letter",
      // },
      // isContainDigit: { message: "Password must contain at least one digit" },
      // min: { message: "Password must contain at least 8 characters", value: 8 },
    },
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    // validateSchema
    //   .validate(data)
    //   .then(() => setErrors({}))
    //   .catch((err) => setErrors({ [err.path]: err.message }));
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValidate = validate();
    if (!isValidate) return;

    try {
      // await logIn({
      //   email: data.email,
      //   password: data.password,
      // });
      await logIn(data);
      history.push("/"); // Redirect to home page after successful login
      // setData({ email: "", password: "", stayOn: false });
    } catch (error) {
      setEnterError(error.message);
    }
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
      {enterErrorr && <p className="alert alert-danger">{enterErrorr}</p>}
      <button
        className="btn btn-primary w-100 mx-auto"
        type="submit"
        disabled={!isValid || enterErrorr}
      >
        Login
      </button>
    </form>
  );
};

export default LoinForm;
