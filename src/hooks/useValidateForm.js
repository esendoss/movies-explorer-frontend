import { useState, useCallback, useEffect } from "react";

const useValidateForm = (callback, setModal, setModalTitle) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [checkValidateEmail, setValidateEmail] = useState(false);
  const [checkValidity, setValidity] = useState(false);

  const handleChange = (event) => {
    const input = event.target;
    const { name, value } = input;

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: input.validationMessage });
    setValidity(input.closest("form").checkValidity());

    if (name === "email" || values.email) {
      let validateEmail;
      if (name === "email") {
        validateEmail = value.split("@");
      } else {
        validateEmail = values.email.split("@");
      }

      if (validateEmail.length === 2) {
        let preparedEmail = validateEmail[1].toString().split(".");

        if (preparedEmail.length === 2) {
          setValidateEmail(
            (preparedEmail[0] === "gmail" && preparedEmail[1] === "com") ||
              (preparedEmail[0] === "mail" && preparedEmail[1] === "ru") ||
              (preparedEmail[0] === "yandex" && preparedEmail[1] === "ru") ||
              (preparedEmail[0] === "ya" && preparedEmail[1] === "ru") ||
              (preparedEmail[0] === "proba" && preparedEmail[1] === "com") ||
              (preparedEmail[0] === "proba" && preparedEmail[1] === "ru")
          );
        } else {
          setValidateEmail(false);
        }
      } else {
        setValidateEmail(false);
      }
    }
  };

  useEffect(() => {
    setIsValid(checkValidity && checkValidateEmail);
  }, [checkValidateEmail, checkValidity, isValid]);

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
    } else {
      setModal(true);
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
    setValues,
    resetForm,
    handleSubmit,
    handleChange,
  };
};

export default useValidateForm;
