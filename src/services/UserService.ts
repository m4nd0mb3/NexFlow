import { UserRepository } from '../repositories/UserRepository';
import { User } from '../entities/User';
import { injectable } from 'inversify';
import { generateToken } from '../services/AuthService';
import * as bcrypt from 'bcryptjs';
// const bcrypt = require('bcryptjs');

import { genSaltSync, hashSync } from "bcrypt-ts";

@injectable()
export class UserService {
    private userRepository = UserRepository;

    async createUser(name: string, email: string, password: string): Promise<User> {
        // const user = this.userRepository.create({ name, email, password });
        const user = new User();
        user.email = email;
        user.name = name;
        user.password = await bcrypt.hash(password, 10);
        return this.userRepository.save(user);
    }

    async getUserById(userId: string): Promise<User | undefined | null> {
        return await this.userRepository.findOneBy({uuid:userId});
    }
    async getAllUser(): Promise<User[]| undefined| null>{
        try {
            const users: User[] = await this.userRepository.find({ select: ["name", "email"] });
            return users;
          } catch (error) {
           
            console.error(error);
            return null;
          }

    }

    async signInUser(email: string, password: string): Promise<any | undefined | null> {
        const user = await this.userRepository.findOneBy({email:email});
        if (!user) {
            return null;
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return null;
        }
        delete user.password
        
        return {
            token: generateToken(user),
            user
        };
    }
}
