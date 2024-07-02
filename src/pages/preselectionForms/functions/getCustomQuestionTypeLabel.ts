export const getCustomQuestionTypeLabel = (type: CustomQuestionType) => {
  switch (type) {
    case "text":
      return "Free Text Question";
    case "radio":
      return "Single Choice Question";
    case "select":
      return "Single Choice Question with options search";
    case "multiselect":
      return "Multiple Choice Question with options search";
    default:
      return "";
  }
};
