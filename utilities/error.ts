const getError = (err: any) => {
  if (err.response && err.response.status === 422) {
    const errors = err.response.data.errors; // Assuming errors are in this format
    if (errors.firstName) {
      return "errorFirstName";
    } else if (errors.lastName) {
      return "errorLastName";
    } else if (errors.email && errors.email === "emailAlreadyExists") {
      return "errorEmail";
    }
    return "errorValidation";
  }
  return err.message; // Default message
};

export { getError };
