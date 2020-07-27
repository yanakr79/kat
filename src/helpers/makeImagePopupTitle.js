const makeImagePopupTitle = (title, author, authorPrefix) => {
  if (!title && !author) {
    return '';
  }
  if (title && !author) {
    return title;
  }
  if (!title && author) {
    return `${authorPrefix}: ${author}`;
  }
  return `${title} ${authorPrefix}${author}`;
};

export default makeImagePopupTitle;
