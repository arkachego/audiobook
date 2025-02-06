import Joi from "joi";

const validator = Joi.object({
  name: Joi.string().max(20).required(),
});

export default validator;
