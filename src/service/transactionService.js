import { prismaClient } from "../application/database.js";
import midtransClient from 'midtrans-client';


const getAllTransaction = async(body)=>{
    //admin
    const getAll = await prismaClient.transaction.findMany({
        select:{
            user : true,
            meals :true 
        }
    })
    return getAll?.map((data)=>({
        user : data.user,
        meal : data.meals
    }));
}

const notifTransaction = async(body)=>{
// Create Core API / Snap instance (both have shared `transactions` methods)
let apiClient = new midtransClient.Snap({
        isProduction : false,
        serverKey : process.env.SERVER_KEY,
        clientKey : process.env.CLIENT_KEY
    });

apiClient.transaction.notification(body)
    .then( async (statusResponse)=>{
        let orderId = statusResponse.order_id;
        let transactionStatus = statusResponse.transaction_status;
        let fraudStatus = statusResponse.fraud_status;

        console.log(`Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`);

        // Sample transactionStatus handling logic

        if (transactionStatus == 'capture'){
	    if (fraudStatus == 'accept'){
              
            }
        } else if (transactionStatus == 'settlement'){
            
             await prismaClient.transaction.update({
                where:{
                    orderId : orderId
                },
                data : {
                    status : transactionStatus
                }
            })
        } else if (transactionStatus == 'cancel' ||
          transactionStatus == 'deny' ||
          transactionStatus == 'expire'){

        } else if (transactionStatus == 'pending'){
        
           await prismaClient.transaction.update({
            where:{
                orderId : orderId
            },
            data : {
                status : transactionStatus
            }
        })
        }
    });

}






export default {
    getAllTransaction,
    notifTransaction,
 
}