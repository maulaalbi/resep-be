import { logger } from "../application/logger.js";
import mealService from "../service/mealService.js";


const create = async (req, res,next) => {
    try{
        const user = req.user;
        const request = req.body;
        const fileData = req.file;
        console.log(fileData);
        const result = await mealService.create(user,fileData, request);
        res.status(200).json({
            data : result
        })
    }catch(e){
        next(e);
    }
}

const update = async (req, res, next) => {
    try{
        const user = req.user;
        const request = req.body;

        const result = await mealService.update(user,request);
        res.status(200).json({
            data : result
        })
    }catch(e){
        next(e);
    }
}

    const rating = async (req, res, next) => {
        try{
            const user = req.user;
            const idMeal = req.params.idMeal;
            const request = req.body;
            const result = await mealService.ratingMeal(user, idMeal, request);
            res.status(200).json({
                data : result
            })

        }catch(e){
            next(e);
        }
}

const saveMeal = async (req, res, next) => {
    try{
        const user = req.user;
        const idMeal = req.params.idMeal;
        const result = await mealService.saveMeal(user, idMeal);
        res.status(200).json({
            data : result
        })

    }catch(e){
        next(e);
    }
}
const payMeal = async (req, res,next) => {
    try{
        const user = req.user;
        const idMeal = req.params.idMeal;
        const result = await mealService.payMeal(user, idMeal);
        res.status(200).json({
            data : {
                url_redirect : result
            }
        })
    }catch(e){
        next(e);
    }
}

const search = async (req, res, next) => {
    const { q: query, page = 1, limit = 10 } = req.query;

        if (!query) {
            return res.status(400).json({ message: 'Query parameter "q" is required' });
        }

        try {
            const results = await mealService.search(query, parseInt(page), parseInt(limit));
            res.status(200).json({
                data : results

            });
        } catch (e) {
            next(e);
        }
}

const deleteById = async (req, res, next) => {
    try{
        const user = req.user;
        const idMeal = req.params.idMeal;

        const result = await mealService.deleteById(user, idMeal);
        res.status(200).json({
            "message" : "delete data successfully",
        })
    }catch(e){
        next(e);
    }
}

const get = async(req, res, next)=>{
    try{
        const user = req.user;
        const idMeal = req.params.idMeal;

        const result = await mealService.get(user, idMeal);
        res.status(200).json({
            data : result
        })
    }catch(e){
        next(e);
    }
}

const getAll = async(req, res, next)=>{
    //get all meal by user
    try{
        const user = req.user;
        const result = await mealService.getAll(user);
        res.status(200).json({
            data : result
        })
    }catch(e){
        next(e);
    }
}

const getAllUserSave = async(req, res, next)=>{
    //get all meal by user
    try{
        const userId = req.user.id;

        const result = await mealService.getAllUserSave(userId);
        res.status(200).json({
            data : result
        })
    }catch(e){
        next(e);
    }
}



const getAllMeal = async (req, res, next)=>{
    //admin
    try {
        const result = await mealService.getAllMeal();
        res.status(200).json({
            data : result
        });
    }catch(e){
        next(e);
    }
}

const getAllSave = async (req, res, next)=>{
    //admin
    try {
        const result = await mealService.getAllSave();
        res.status(200).json({
            data : result
        });
    }catch(e){
        next(e);
    }
}

export default {
    create,
    get,
    getAll,
    update,
    deleteById,
    rating,
    getAllMeal,
    search,
    saveMeal,
    getAllSave,
    getAllUserSave,
    payMeal,
 
}