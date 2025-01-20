import { ResponseError } from "../error/responseError.js";

const validate = (schema , body) =>{
    const result = schema.validate(body,{
        abortEarly : false
    });
    if(result.error){
        throw new ResponseError(400, result.error.message);
    }else{
        return result.value;
    }
}

export{
    validate
}