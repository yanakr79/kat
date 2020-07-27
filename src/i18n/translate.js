const translate = (key, translations, params = {}) => {
  if (!key) {
    return 'Undefined translation key';
  }

  let s = translations[key];
  if (typeof s !== 'string') {
    return key;
  }
  if (!params) {
    return s;
  }
  const ids = Object.keys(params);
  if (ids.length === 0) {
    return s;
  }
  ids.forEach((id) => {
    s = s.replace(`{{${id}}}`, params[id]);
  });
  return s;
};

module.exports = translate;
