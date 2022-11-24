import { useState, useCallback } from "react";
import isEmail from "validator/es/lib/isEmail";

const useValidateForm = (callback) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (evt) => {
    const input = evt.target;
    const { name, value } = input;

    if (name === "name" && input.validity.patternMismatch) {
      input.setCustomValidity(
        "Имя может содержать только латиницу, кириллицу, пробел, дефис."
      );
    } else {
      input.setCustomValidity("");
    }

    if (name === "email") {
      if (!isEmail(value)) {
        input.setCustomValidity("Некорректный почтовый адрес.");
      } else {
        input.setCustomValidity("");
      }
    }
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: input.validationMessage });
    setIsValid(input.closest("form").checkValidity());
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isValid) {
      if (values.name && values.email && values.password) {
        callback(values.name, values.email, values.password);
      } else if (values.email && values.password) {
        callback(values.email, values.password);
      } else {
        callback(values.name, values.email);
      }
    }
  };
  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    errors,
    isValid,
    setIsValid,
    resetForm,
    handleChange,
    handleSubmit,
  };
};

export default useValidateForm;
