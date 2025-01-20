import Joi from "joi";

const createMealValidation = Joi.object({
    nameMeal       : Joi.string().max(100).required(),
    category    : Joi.string().max(100).required(),
    instructions : Joi.string().max(1000).required(),
});


const getMealValidation = Joi.number().positive().required();

const updateMealValidation = Joi.object({
    id : Joi.number().positive().required(),
    nameMeal       : Joi.string().max(100).optional(),
    category    : Joi.string().max(100).optional(),
    instructions : Joi.string().max(1000).optional(),
})

const ratingMealValidation = Joi.object({
   rating: Joi.number().positive().required()
})

export {
    createMealValidation,
    getMealValidation,
    updateMealValidation,
    ratingMealValidation,
 
}