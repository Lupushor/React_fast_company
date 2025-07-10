import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
// import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";
import { useQuality } from "../../hooks/useQuality";
import { useProfession } from "../../hooks/useProfession";
import { useAuth } from "../../hooks/useAuth";

const RegisterForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    profession: "",
    sex: "Male",
    qualities: [],
    licence: false,
  });

  const { signUp } = useAuth();

  const { qualities } = useQuality();
  const qualitiesList = qualities.map((quality) => ({
    label: quality.name,
    value: quality._id,
  }));

  const { professions } = useProfession();

  const professionsList = professions.map((profession) => ({
    label: profession.name,
    value: profession._id,
  }));

  const [errors, setErrors] = useState({});

  useEffect(() => {}, [professions]);

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
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
    profession: {
      isRequired: { message: "Profession is required" },
    },
    licence: {
      isRequired: {
        message: "You must agree with the license agreement",
      },
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

  // const getProfessionById = (id) => {
  //   for (const prof of professions) {
  //     // if (prof.value === id) {
  //     if (prof._id === id) {
  //       // return { _id: prof._id, name: prof.name };
  //       return prof.name;
  //     }
  //   }
  // };

  // const getQualities = (elements) => {
  //   const qualitiesArray = [];
  //   for (const elem of elements) {
  //     for (const quality in qualities) {
  //       if (elem.value === qualities[quality].value) {
  //         qualitiesArray.push({
  //           _id: qualities[quality].value,
  //           name: qualities[quality].label,
  //           color: qualities[quality].color,
  //         });
  //       }
  //     }
  //   }
  //   return qualitiesArray;
  // };

  // const getQualities = (elements) => {
  //   const qualitiesArray = [];
  //   for (const elem of elements) {
  //     for (const quality of qualities) {
  //       if (elem.value === quality._id) {
  //         qualitiesArray.push({
  //           _id: quality._id,
  //           name: quality.name,
  //         });
  //       }
  //     }
  //   }
  //   return qualitiesArray;
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValidate = validate();
    if (!isValidate) return;

    const newData = {
      ...data,
      qualities: data.qualities.map((q) => q.value),
    };
    // const { profession, qualities } = data;
    // console.log({
    //   ...data,
    //   profession: getProfessionById(profession),
    //   qualities: getQualities(qualities),
    // });

    console.log(newData);
    signUp(newData);
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
      <SelectField
        defaultOption="Choose..."
        options={professionsList}
        value={data.profession}
        name="profession"
        label="Выберите вашу профессию"
        onChange={handleChange}
        error={errors.profession}
      />
      <RadioField
        options={[
          { name: "Male", value: "Male" },
          { name: "Female", value: "Female" },
        ]}
        value={data.sex}
        name="sex"
        onChange={handleChange}
        label="Выберите ваш пол"
      />
      <MultiSelectField
        options={qualitiesList}
        defaultValue={data.qualities}
        onChange={handleChange}
        name="qualities"
        label="Выберите ваши качеств"
      />
      <CheckBoxField
        value={data.licence}
        onChange={handleChange}
        name="licence"
        error={errors.licence}
      >
        Подтвердить <a>лицензионное соглашение</a>
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

export default RegisterForm;
