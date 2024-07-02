export const getProfileTypeLabel = (type: ProfileFieldType) => {
  switch (type) {
    case "address":
      return "Address";
    case "gender":
      return "Gender";
    case "phone_number":
      return "Phone number";
    default:
      return "";
  }
};
