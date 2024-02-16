import { body } from 'express-validator';
// src/controllers/UserController.ts
import { injectable, inject } from 'inversify';
import { controller, httpPost, httpGet, request, response } from 'inversify-express-utils';
import { UserService } from '../services/UserService';
import { User } from '../entities/User';
import TYPES from '../constants/types'; // Certifique-se de criar esse arquivo
import { signInUserValidationMiddleware, userValidationMiddleware } from '../validators/UserValidator';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();
// Apenas a decoracao @injectable() é necessária aqui
// @injectable()
@controller('/users')
export class UserController {
    private userService: UserService;

    constructor(@inject(TYPES.UserService) userService: UserService) {
        this.userService = userService;
    }

    @httpPost('/', userValidationMiddleware /* Middlewares podem ser adicionados aqui */)
    async createUser(@request() req: any, @response() res: any): Promise<void> {
        const { name, email, password } = req.body;
        // console.log(req.body);
        try{

            const user: User = await this.userService.createUser(name, email, password);
            res.status(201).json(user);
        } catch {
            res.status(422).json({
                detail:'Já existe um usuário com este email cadastrado.'
            });
        }
    }

    // @httpGet('/:id', /* Middlewares podem ser adicionados aqui */)
    // async getUserById(@request() req: any, @response() res: any): Promise<void> {
    //     const userId: string = req.params.id;
    //     const user: User | undefined | null = await this.userService.getUserById(userId);
    //     res.json(user);
    // }


    @httpGet("/")
    async getAllUsers( @response() response:any): Promise<void>{
        try {
            const users: User[]=await this.userService.getAllUser();
             response.json(users)
        } catch (error) {
            response.status(500).json({error: 'Erro ao obter os users'});
            
        }
    }

    @httpPost('/signIn', signInUserValidationMiddleware /* Middlewares podem ser adicionados aqui */)
    async signInUser(@request() req: any, @response() res: any): Promise<void> {
        try {
            const { email, password } = req.body;
            
            const user = await this.userService.signInUser(email, password)

            if (!user) {
                return res.status(401).json({ message: 'Credenciais inválidas' });
            }

            res.json({ token: user });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao realizar o login' });
        }
    }

    @httpPost('/validate-token',  /* Middlewares podem ser adicionados aqui */)
    async validateToken(@request() req: any, @response() res: any): Promise<void> {
        try {
            const token = req.body.token;

            jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
                if (err) {
                    res.status(401).json({ valid: false });
                } else {
                    res.json({ valid: true, decoded });
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao realizar o login' });
        }
    }
}


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API para operações relacionadas a usuários
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *       422:
 *         description: Já existe um usuário com este email cadastrado.
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obter todos os usuários
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuários obtida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *       500:
 *         description: Erro ao obter os usuários.
 *         content:
 *           application/json:
 *             exemple:
 *               error: Erro ao obter os usuários
 */

/**
 * @swagger
 * /users/signIn:
 *   post:
 *     summary: Autentica um usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Autenticação bem-sucedida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Credenciais inválidas
 *       500:
 *         description: Erro ao realizar o login
 */

/**
 * @swagger
 * /users/validate-token:
 *   post:
 *     summary: Valida um token de autenticação
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *             required:
 *               - token
 *     responses:
 *       200:
 *         description: Token válido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 valid:
 *                   type: boolean
 *                 decoded:
 *                   type: object
 *       401:
 *         description: Token inválido
 *       500:
 *         description: Erro ao realizar a validação do token
 */
