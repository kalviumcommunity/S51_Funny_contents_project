const Joi = require("joi");

const validator = (schema) => (data) =>
    schema.validate(data, { abortEarly: false });

const postUpdateSchema = Joi.object({
    name: Joi.string().min(3).max(40).required(),
    country: Joi.string().required(),
    age: Joi.number().min(11).max(100).required(),
    content: Joi.string().required(),
});

const authSchema = Joi.object({
    username: Joi.string().min(3).max(40).required(),
    country: Joi.string().required(),
    age: Joi.number().min(11).max(100).required(),
    password: Joi.string().min(4).max(20).required(),
});

const validators = {
    PostAndUpdateValidator: validator(postUpdateSchema),
    AuthValidator: validator(authSchema),
};

module.exports = validators;
