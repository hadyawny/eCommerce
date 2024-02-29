import Joi from "joi";

const addAddressVal = Joi.object({
  street: Joi.string().required().trim(),
  phone: Joi.string().required().trim(),
  city: Joi.string().required().trim(),
});
const paramsIdVal = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

const updateAddressVal = Joi.object({
  id: Joi.string().hex().length(24).required(),

  street: Joi.string().required().trim(),
  phone: Joi.string().required().trim(),
  city: Joi.string().required().trim(),
});

export { addAddressVal, paramsIdVal, updateAddressVal };
