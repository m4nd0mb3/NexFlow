// src/auth/AuthMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

export class AuthMiddleware {
    static authenticate(request: Request, response: Response, next: NextFunction): void {
        // Adicione lógica de autenticação aqui
        // Exemplo: Verificar token, validar sessão, etc.
        // Se autenticação falhar, retorne uma resposta de não autorizado.
        next();
    }

    static verifyToken = (req: Request, res: Response, next: NextFunction): void => {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            res.status(401).json({ message: 'Token não fornecido' });
        }

        jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Token inválido' });
            }

            // Adicionar o payload do token ao objeto de solicitação
            req.body.user = decoded;
            next();
        });
    };
}
