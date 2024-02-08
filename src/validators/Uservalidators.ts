const Joi = require("joi");

export const userSignUpValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const userLoginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const userIdValidation = Joi.object({
 id:Joi.string().required(),
});

export const ItemValidation = Joi.object({
  name:Joi.string().required(),
  price:Joi.number().required(),
  rating:Joi.number().required(),
 });