const formatDate = (date) => {
  return `${new Date(date).getMonth()}/${new Date(date).getDay()}/${new Date(
    date
  ).getFullYear()}`;
};

module.exports = formatDate;
