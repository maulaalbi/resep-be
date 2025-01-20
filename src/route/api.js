import express from "express";
import userController from "../controller/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import mealController from "../controller/mealController.js";
import { upload } from "../helper/multer.js";


const userRouter = new express.Router();

userRouter.use(authMiddleware);

//api user
userRouter.get('/api/users/current', userController.get);
userRouter.put('/api/users/current', userController.update);
userRouter.put('/api/users/logout', userController.logout);


//api meal
userRouter.post('/api/meals',upload.single('imageMeal'),mealController.create);
userRouter.get('/api/meals/:idMeal', mealController.get);
userRouter.get('/api/meals', mealController.getAll);
userRouter.put('/api/meals', mealController.update);
userRouter.delete('/api/meals/:idMeal', mealController.deleteById);
userRouter.post('/api/meals/ratings/:idMeal', mealController.rating);
userRouter.get('/api/meals', mealController.getAllMeal);



export{
    userRouter,
}