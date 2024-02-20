//import * as Joi from 'joi'
const Joi = require("joi");


export const userSignUpValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  password: Joi.string().min(5).max(20).required(),
  // .message({'password.min':'{#label}password must be in between {#min}-{#max} characters'}),
  type: Joi.string().required(),
  status: Joi.string().required(),

});

export const userLoginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const userIdValidation = Joi.object({
 id:Joi.string().required(),
});

export const verifyUserForResendEmail= Joi.object({
  email: Joi.string().email().required(),
});

export const ItemValidation = Joi.object({
  name:Joi.string().required(),
  price:Joi.number().required(),
  rating:Joi.number().required(),
 });

 export const userEmailValidation = Joi.object({
  verification_token:Joi.number().required(),
  email:Joi.string().required()
 });