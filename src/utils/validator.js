export function validator(data, config) {
  const errors = {};
  

  function validate(validateMethod, data, config) {

    let statusValidate;

    switch (validateMethod) {
      case "isRequired":
        statusValidate = !data.trim()
        break;

      case "isEmail":
        // eslint-disable-next-line no-case-declarations
        const emailRegExp = /^\S+@\S+\.\S+$/g;
        statusValidate = !emailRegExp.test(data);
        break;  
      

      case "isCapitalSymbol":
        // eslint-disable-next-line no-case-declarations
        const capitalRegExp = /[A-Z]/g;
        statusValidate = !capitalRegExp.test(data);
        break;

      case "isContainDigit":
        // eslint-disable-next-line no-case-declarations
        const digitRegExp = /\d+/g;
        statusValidate = !digitRegExp.test(data);
        break;

      case "min":
        statusValidate = data.length < config.value;
        break;
            
      default:
        break;
    }
    if (statusValidate) {
      return config.message;
    }
  }
  
  for (const fieldName in data) {
    for (const validateMethod in config[fieldName]) {
      const error = validate(
        validateMethod,
        data[fieldName],
        config[fieldName][validateMethod]
      );
      if (error) {
        errors[fieldName] = error;
      }
    }
  }
  return errors;
}
