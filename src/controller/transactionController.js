import transactionService from "../service/transactionService.js";


const getAllTransaction = async (req, res, next)=>{
    //admin
    try {
        const result = await transactionService.getAllTransaction();
        res.status(200).json({
            data : result
        });
    }catch(e){
        next(e);
    }
}

const notifTransaction = async (req, res, next)=>{
    //admin
    try {
        const result = await transactionService.notifTransaction(req.body);
        res.status(200).json({
            data : result
        });
    }catch(e){
        next(e);
    }
}

export default {
    getAllTransaction,
    notifTransaction,
 
}