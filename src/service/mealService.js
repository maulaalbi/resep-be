import { response } from "express";
import { prismaClient } from "../application/database.js";
import { logger } from "../application/logger.js";
import { ResponseError } from "../error/responseError.js";
import { createMealValidation, getMealValidation, ratingMealValidation, updateMealValidation } from "../validation/mealValidation.js"
import { validate } from "../validation/validation.js";
import fs from "fs";
import {google} from "googleapis";
import {v4 as uuid} from "uuid";
import midtransClient from 'midtrans-client';
import short from 'short-uuid';




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
                price : true,
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
            ratings : true,
            price : true
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
    const userId = parseInt(user.id,10);
    const mealId = parseInt(idMeal,10);
    const ratings = await prismaClient.rating.create({
        data : {
            userId : userId,
            mealId : mealId,
            rating : valueRating,
            comments : validateRating.comments
        },
        select:{
            rating : true,
            comments : true
        }

    })
    return ratings;
}

const saveMeal = async(user,idMeal)=>{
    const userId = parseInt(user.id);
    const mealId = parseInt(idMeal);
    const saveMeal = await prismaClient.save.create({
        data : {
            userId : userId,
            mealId : mealId
        },
        select:{
            saveId: true,
            userId : true,
            mealId : true
        }
    })
    if(!saveMeal){
        throw new ResponseError(404,"meal not found");
    }

    return saveMeal;
}

let snap = new midtransClient.Snap({
    // Set to true if you want Production Environment (accept real transaction).
    isProduction : false,
    serverKey : process.env.SERVER_KEY
});
const payMeal = async (user,idMeal)=>{
    const userId = parseInt(user.id);
    const mealId = parseInt(idMeal);
    const meal = await prismaClient.meal.findFirst({
        where : {
            id : mealId,
        },select:{
            id:true,
            price : true,
        
        }
    });

    const users = await prismaClient.user.findFirst({
        where : {
            id : userId
        },select:{
            id : true,
            name : true,
            email : true
        }
    })

    
    const idOrder = uuid().toString().replace(/-/g, '').substring(0, 8);
    const authString = btoa(process.env.AUTH_STRING); 
    let parameter = {
        transaction_details: {
            "order_id": idOrder,
            "gross_amount": parseInt(meal.price)
        },
        credit_card:{
            secure : true
        },
        customer_details: {
           "first_name": users.name,
           "last_name": users.name,
           "email": users.email,
           "phone": ""
        }
    };

    const response = await fetch(process.env.URL_SERVER,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Basic ${authString}`
        },
        body: JSON.stringify(parameter)
    })

    const pay = await prismaClient.transaction.create({
        data : {
            orderId : parameter.transaction_details.order_id,
            userId  : users.id,    
            mealId  : meal.id,
            name    : users.name, 
            price   : parseInt(meal.price)  
        }
    })

 
    const transaction = await snap.createTransaction(parameter);
    const transactionToken = transaction.token;
    const transactionUrl = transaction.redirect_url;
    return  transactionUrl;
   
}


const search = async (query, page=1, limit=10) => {
    const results = await prismaClient.$queryRaw`
    SELECT * FROM \`meals\`
    WHERE LOWER(\`nameMeal\`) LIKE LOWER(${`%${query}%`})
       OR LOWER(\`category\`) LIKE LOWER(${`%${query}%`})
    LIMIT ${limit}
    OFFSET ${(page - 1) * limit}
  `;

    return results;
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
    if (meal.length === 0) {
        throw new ResponseError(404, "meal not found");
    }
    return meal;
}

const getAllUserSave = async (userId)=>{
    try {
        const save = await prismaClient.save.findMany({
            where :{
                userId : userId
            },
            select:{
                saveId : true,
                userId : true,
                mealId : true,
                meals : true
            }
        })
        return save;
    }catch (e){
        console.log(e.message);
        throw new ResponseError(500, e.message);
    }
    

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
    //admin
    const getAll = await prismaClient.meal.findMany({
        select:{
            id : true,
            nameMeal : true,
            category : true,
            imageMeal : true,
            instructions : true,
            price : true,
            userId : true,
            ratings : true
        }
    })

    return getAll;  
}

const getAllSave = async(body)=>{
    //admin
    const getAll = await prismaClient.save.findMany({
        select:{
            saveId: true,
            userId : true,
            mealId : true,
            meals : true,
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
    getAllMeal,
    search,
    saveMeal,
    getAllSave,
    getAllUserSave,
    payMeal
 
}