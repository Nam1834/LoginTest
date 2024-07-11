import Joi from "joi";

const createUserSchema = Joi.object({
  email: Joi.string().email(),
  passWord: Joi.string().min(6).required(),
});

module.exports = createUserSchema;
