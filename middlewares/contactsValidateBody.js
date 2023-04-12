const { HttpError } = require("../helpers/HttpError");

const contactsValidateBody = (schema) => {
  const func = (req, res, next) => {
    const { name, email, phone } = req.body;
    const { error } = schema.validate({ name, email, phone });
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
  return func;
};

module.exports = {
  contactsValidateBody,
};
