import Joi from "joi";

const validateUser = data => {
    const schema = Joi.object({
        name: Joi.string().min(1).max(20).regex(/^[A-Za-z0-9\s]+$/).required(),
        email: Joi.string().email().required(),
    }).unknown();
    return schema.validate(data).error;
}

const validateEntry = data => {
    const schema = Joi.object({
        description: Joi.string().min(1).max(80).required(),
        value: Joi.number().required(),
    }).unknown();
    return schema.validate(data).error;
}



export {
    validateUser,
    validateEntry,
}