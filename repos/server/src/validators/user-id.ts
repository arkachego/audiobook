import Joi from "joi";

const validator = Joi.object({
  id: Joi.string().guid({
    version: "uuidv4",
  }).required(),
});

export default validator;
