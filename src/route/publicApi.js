import express from "express";
import userController from "../controller/userController.js";
import mealController from "../controller/mealController.js";
import transactionController from "../controller/transactionController.js";


const publicRouter = new express.Router();

publicRouter.post('/api/users',userController.register);
publicRouter.post('/api/users/login',userController.login);
publicRouter.get('/api/usersAll',userController.getUserAll);
publicRouter.get('/api/mealsAll', mealController.getAllMeal);
publicRouter.get('/api/meals/search', mealController.search);
publicRouter.get('/api/meals/save', mealController.getAllSave);
publicRouter.get('/api/transaction', transactionController.getAllTransaction);
publicRouter.post('/api/notifTransaction', transactionController.notifTransaction);





export{
    publicRouter,
}   