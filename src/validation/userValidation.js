import { Gender } from "@prisma/client";
import Joi from "joi";

const registerUserValidation = Joi.object({
    email : Joi.string().email().max(100).required(),
    password : Joi.string().max(100).required(),
    name : Joi.string().max(100).required(),
    gender : Joi.string().valid("FEMALE","MALE","OTHER").required(),
    tgl_lahir : Joi.string().required(),
    alamat : Joi.string().max(1000).required()

});

const loginUserValidation = Joi.object({
    email : Joi.string().email().max(100).required(),
    password : Joi.string().max(100).required(),
});


const getUserValidation = Joi.string().email().max(100).required();

const updateUserValidation = Joi.object({
    email : Joi.string().email().max(100).required(),
    password : Joi.string().max(100).optional(),
    name : Joi.string().max(100).optional()
});

export{
    registerUserValidation,
    loginUserValidation,
    getUserValidation,
    updateUserValidation
};