const regex = {
  name: /^[a-zA-Z ]{3,20}$/,
  email:
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  OTP: /^\d{6}$/,
};
const ValidateField = (value, field) => {
  if (field === "firstName" || field === "lastName") {
    const isValid = regex.name.test(value);
    if (field === "lastName" && value.length === 0) {
      return true;
    }
    return isValid ? true : "Please enter a valid name.";
  } else if (field === "email") {
    const isValid = regex.email.test(value);
    return isValid ? true : "Please enter a valid email.";
  } else if (field === "password" || field === "cPassword") {
    const isValid = regex.password.test(value);
    return isValid
      ? true
      : "Minimum eight characters, at least one letter, one number and one special character.";
  } else if (field === "OTP") {
    const isValid = regex.OTP.test(value);
    return isValid ? true : "OTP must be 6 digits";
  } else if (field === "about") {
    if (value.length <= 30 || value.length >= 300) {
      return "About must be between 30 to 300 characters";
    }
    return true;
  }
};
export default ValidateField;
