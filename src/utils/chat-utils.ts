import moment from "moment";

export const formatMessageDate = (date: Date) => {
  const msgDate = moment(date);
  const today = moment().startOf("day");
  const yesterday = moment().subtract(1, "day").startOf("day");

  if (msgDate.isSame(today, "d")) {
    return `Today at ${msgDate.format("h:mm A")}`;
  } else if (msgDate.isSame(yesterday, "d")) {
    return `Yesterday at ${msgDate.format("h:mm A")}`;
  } else {
    return msgDate.format("MM/DD/YYYY"); // Adjust this format as needed
  }
};
