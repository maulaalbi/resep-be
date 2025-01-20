import web from "./application/web.js";
import {logger} from "./application/logger.js";

web.listen(3000, ()=>{
    logger.info("App Start");
});