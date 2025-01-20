import { logger } from "../application/logger.js";
import userService from "../service/userService.js"

const register = async (req ,res,next)=>{
    try {
        const result = await userService.register(req.body);
        res.status(200).json({
            data : result
        });
    }catch(e){
        next(e);
    }
    
}

const getUserAll = async (req, res, next)=>{
    try {
        const result = await userService.getUserAll();
        res.status(200).json({
            data : result
        });
    }catch(e){
        next(e);
    }
}

// const deleteById = async (req ,res,next)=>{
//     try {
//         id = req.user.id;
//         const result = await userService.deleteById(id);
//         res.status(200).json({
//             data : result
//         });
//     }catch(e){
//         next(e);
//     }
    
// }

const login  = async (req , res, next) =>{
    try{
        const result = await userService.login(req.body);

        res.status(200).json({
            data : result
        })
    }catch(e){
        next(e);
    }
}

const get = async (req , res, next) =>{
    try{
        const email = req.user.email;
        const result = await userService.get(email);

        res.status(200).json({
            data : result
        })
    }catch(e){
        next(e);
    }
}

const update = async (req , res, next) =>{
    try{
        const email = req.user.email;
        const request = req.body;
        request.email = email;

        const result = await userService.update(request);


        res.status(200).json({
            "message" : "updated successfully"
        })
    }catch(e){
        next(e);
    }
}

const logout = async (req , res, next) =>{
    try{
        const token = req.user.token;

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Token is required",
            });
        }

        // Panggil service logout
        await userService.logout(token);

        // Berikan respons sukses
        res.status(200).json({
            success: true,
            message: "Logout successful",
        });
    }catch(e){
        next(e);
    }
}
export default {
    register,
    login,
    get,
    update,
    getUserAll,
    logout,
}