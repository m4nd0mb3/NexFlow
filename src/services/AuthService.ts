import { User } from '../entities/User';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();


export const generateToken = (user: User): string => {
    return jwt.sign({ uuid: user.uuid, 'name': user.name, email: user.email }, process.env.JWT_SECRET as string, {
        expiresIn: '1h', 
    });
};
