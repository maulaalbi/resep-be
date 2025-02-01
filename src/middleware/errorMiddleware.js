import { ResponseError } from "../error/responseError.js";


const errorMiddleware = (err, req, res, next) => {
    // Jika tidak ada error, lanjutkan ke middleware berikutnya
    if (!err) {
        next();
        return;
    }

    // Default status code dan pesan error
    let statusCode = 500; // Internal Server Error
    let errorMessage = "Internal Server Error";

    // Jika error adalah instance dari ResponseError, gunakan status dan pesan dari error tersebut
    if (err instanceof ResponseError) {
        statusCode = err.status;
        errorMessage = err.message;
    }
    // Jika error memiliki pesan, gunakan pesan tersebuts
    else if (err.message) {
        errorMessage = err.message;
    }

    // Kirim response error
    res.status(statusCode).json({
        errors: errorMessage,
    }).end();
};

export{
    errorMiddleware
}