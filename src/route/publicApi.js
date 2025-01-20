import express from "express";
import userController from "../controller/userController.js";
import mealController from "../controller/mealController.js";


const publicRouter = new express.Router();

publicRouter.post('/api/users',userController.register);
publicRouter.post('/api/users/login',userController.login);
publicRouter.get('/api/usersAll',userController.getUserAll);
publicRouter.get('/api/mealsAll', mealController.getAllMeal);



export{
    publicRouter,
}