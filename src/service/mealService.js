import { response } from "express";
import { prismaClient } from "../application/database.js";
import { logger } from "../application/logger.js";
import { ResponseError } from "../error/responseError.js";
import { createMealValidation, getMealValidation, ratingMealValidation, updateMealValidation } from "../validation/mealValidation.js"
import { validate } from "../validation/validation.js";
import fs from "fs";
import {google} from "googleapis";



const create = async  (user,fileData,request)=>{
    const meal = validate(createMealValidation,request);
    meal.userId = user.id;
    meal.imageMeal = fileData;

    const gd_folder_id = '1O27hxG5RjaCH4j1eEdqLx4SMk8t0dYaz';
    const auth = new google.auth.GoogleAuth({
        credentials :  {
            "type": process.env.GOOGLE_DRIVE_TYPE,
            "project_id": process.env.GOOGLE_DRIVE_PROJECT_ID,
            "private_key_id": process.env.GOOGLE_DRIVE_PRIVATE_KEY_ID,
            "private_key": process.env.GOOGLE_DRIVE_PRIVATE_KEY,
            "client_email": process.env.GOOGLE_DRIVE_CLIENT_EMAIL,
            "client_id": process.env.GOOGLE_DRIVE_CLIENT_ID,
            "auth_uri": process.env.GOOGLE_DRIVE_AUTH_URI,
            "token_uri": process.env.GOOGLE_DRIVE_TOKEN_URI,
            "auth_provider_x509_cert_url": process.env.GOOGLE_DRIVE_AUTH_PROVIDER,
            "client_x509_cert_url": process.env.GOOGLE_DRIVE_AUTH_CLIENT_URI,
            "universe_domain": process.env.GOOGLE_DRIVE_UNIVERSE_DOMAIN
        },
        scopes :   ['https://www.googleapis.com/auth/drive']
    })

    const driveService = google.drive({
        version : 'v3',
        auth 
    })

    const fileMetadata = {
        'name' : meal.imageMeal.filename,
        'parents' : [gd_folder_id]
    }

    const media = {
        mimeType : meal.imageMeal.mimetype,
        body : fs.createReadStream(meal.imageMeal.path)
    }

    try {
        const imageMeal = await driveService.files.create({
            resource : fileMetadata,
            media : media,
            fields : 'id'
        })
    
        meal.imageMeal = imageMeal.data.id;
        console.log(meal)
    
        return await prismaClient.meal.create({
            data : meal,
            select:{
                nameMeal : true,
                category : true,
                instructions : true,
                imageMeal : true,
                userId : true
            }
        })
    } catch(err) {
        console.log(err)
    }
    
}

const get = async (user,idMeal)=>{
    idMeal = validate(getMealValidation,idMeal);
    const meal = await prismaClient.meal.findFirst({
        where :{
            userId : user.id,
            id : idMeal
        },
        select:{
            id : true,
            nameMeal : true,
            category : true,
            instructions : true,
            rating : true
        }
    }) 

    if(!meal){
        throw new ResponseError(404,"meal not found");
    }
    return meal;
}

const ratingMeal = async (user,idMeal,request) => {

    
    const validateRating = validate(ratingMealValidation,request);

    const valueRating = parseInt(validateRating.rating,10);
    console.log(valueRating);
    const userId = parseInt(user.id,10);
    const mealId = parseInt(idMeal,10);
    const ratings = await prismaClient.rating.create({
        data : {
            userId : userId,
            mealId : mealId,
            rating : valueRating
        },
        select:{
            rating : true
        }

    })
    return ratings;
}

const update = async (user,request)=>{
    const updatedMeal = validate(updateMealValidation,request);
    updatedMeal.userId = user.id;

    const data= {};
    if(updatedMeal.id){
        data.id = updatedMeal.id;
    }
    if(updatedMeal.nameMeal){
        data.nameMeal = updatedMeal.nameMeal;
    }

    if(updatedMeal.category){
        data.category = updatedMeal.category;
    }

    if(updatedMeal.instructions){
        data.instructions = updatedMeal.instructions;
    }


    const meal = await prismaClient.meal.update({
        where:{
            userId : user.id,
            id : updatedMeal.id
        },
        data : data,
        select:{
            nameMeal : true,
            category : true,
            instructions : true,
        }

    })
    return meal;
}

const getAll = async (user)=>{

    const meal = await prismaClient.meal.findMany({
        where :{
            userId : user.id
        },
        select:{
            id : true,
            nameMeal : true,
            category : true,
            imageMeal : true,
            instructions : true,
            userId : true,
            ratings : true
        }
    })
   if(!meal){
        throw new ResponseError(404,"meal not found");
   }
    return meal;
}

const deleteById = async (user,idMeal)=>{
    idMeal = validate(getMealValidation,idMeal);
    const meal = await prismaClient.meal.delete({
        where :{
            userId : user.id,
            id : idMeal
        }
    }) 
}

const getAllMeal = async(body)=>{
    const getAll = await prismaClient.meal.findMany({
        select:{
            id : true,
            nameMeal : true,
            category : true,
            imageMeal : true,
            instructions : true,
            userId : true,
            ratings : true
        }
    })

    return getAll;  
}


export default {
    create,
    get,
    getAll,
    update,
    deleteById,
    ratingMeal,
    getAllMeal
}