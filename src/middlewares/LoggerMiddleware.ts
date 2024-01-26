// src/middlewares/LoggerMiddleware.ts
import { Request, Response, NextFunction } from 'express';

export class LoggerMiddleware {
    static log(request: Request, response: Response, next: NextFunction): void {
        console.log(`[${new Date().toISOString()}] ${request.method} ${request.path}`);
        next();
    }
}
