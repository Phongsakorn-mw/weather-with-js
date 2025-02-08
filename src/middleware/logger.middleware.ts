import { Request, Response, NextFunction } from "express";
import moment from "moment";


// models
import { LogModel } from "../models/logger.model";


const LoggerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await LogModel.create({
            method   : req.method,
            url      : req.url,
            timestamp: moment().toDate(),
            headers  : req.headers,
            body     : req.body
        });
        console.log(`[LOG] ${req.method} ${req.url} - Stored in MongoDB`);
    } catch (error) {
        console.log(`[LOG ERROR]`, error);
    }
    next();
}


export default LoggerMiddleware;