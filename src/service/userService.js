import { prismaClient  } from "../application/database.js";
import { ResponseError } from "../error/responseError.js";
import { getUserValidation, loginUserValidation, registerUserValidation, updateUserValidation } from "../validation/userValidation.js";
import { validate } from "../validation/validation.js";
import bcrypt from "bcrypt";
import {v4 as uuid} from "uuid";


const register = async (body) =>{
    const user = validate(registerUserValidation,body);
    const countUser = await prismaClient.user.count({
        where : {
            email : user.email
        }
    })

    if(countUser === 1){
        throw new ResponseError(400,"user already exists")
    }

    user.password = await bcrypt.hash(user.password,10);

    return await prismaClient.user.create({
        data : user,
        select:{
            email : true,
            name : true,
            gender : true,
            tgl_lahir : true,
            alamat : true,
        }
    })
}

const getUserAll = async(body)=>{
    const getAll = await prismaClient.user.findMany({
        select:{
            id: true,
            email : true,
            name : true,
            token: false,
            gender : true,
            tgl_lahir : true,
            alamat : true,
        }
    })

    return getAll;  
}
const login = async (request) =>{
    const loginRequest = validate(loginUserValidation,request);

    const user = await prismaClient.user.findFirst({
        where :{
            email : loginRequest.email
        },
        select:{
            email : true,
            password : true
        }
    })


    if(!user){
        throw new ResponseError(401,"username or password wrong")
    }
    const validPassword = await bcrypt.compare(loginRequest.password , user.password);

    if(!validPassword){
        throw new ResponseError(401,"username or password wrong")
    }



    const token = uuid().toString();

    return prismaClient.user.update({
        data :{
            token : token,
        },
        where:{
            email : user.email
        },
        select :{
            token : true
        }
    })
}

const get = async (email)=>{
    email = validate(getUserValidation, email);

    const user = await prismaClient.user.findUnique({
        where :{
            email : email
        },
        select:{
            id : true,
            email : true,
            name : true,
            gender : true,
            tgl_lahir : true,
            alamat : true,
        }
    })

    if(!user){
        throw new ResponseError(404,"user not found");
    }
    return user;
}

// const deleteById = async (id)=>{
//     id = validate(getUserValidation, id);

//     const id = await prismaClient.user.delete({
//         where :{
//             id : id
//         }
//     })

// }


const update = async(request)=>{
    const user = validate(updateUserValidation,request);

    const totalUserInDatabase = await prismaClient.user.count({
        where : {
            email : user.email
        }
    })

    if(totalUserInDatabase !== 1){
        throw new ResponseError(404,"user not found");
    }

    const data = {};
    
    if(user.name){
        data.name = user.name
    }

    if(user.password){
        data.password = await bcrypt.hash(user.password,10)
    }

    return await prismaClient.user.update({
        where:{
            email : user.email
        },
        data : data,
        select :{
            name : true,
        }
    })

}

const logout = async (token) =>{
    if (!token) {
        throw new Error("Token is required");
    }

    // Cari dan update user berdasarkan token
    const user = await prismaClient.user.updateMany({
        where: {
            token: token,
        },
        data: {
            token: null, // Set token ke null
        },
    });

    // Jika tidak ada user yang diupdate, berarti token tidak valid
    if (user.count === 0) {
        throw new Error("Invalid or expired token");
    }

    return true; 
}

export default {
    register,
    login,
    get,
    update,
    getUserAll,
    logout,
}