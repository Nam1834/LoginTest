import Joi from "joi";

const updateUserSchema = Joi.object({
  passWord: Joi.string().min(6).required(),
});

module.exports = updateUserSchema;
