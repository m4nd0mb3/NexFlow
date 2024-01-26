// src/routes/routes.ts
import express from 'express';
import { UserController } from '../controllers/UserController';
import { LoggerMiddleware } from '../middlewares/LoggerMiddleware';
import { AuthMiddleware } from '../auth/AuthMiddleware';
import { UserValidator, signUpValidation } from '../validators/UserValidator';
import { Container } from 'inversify';
import TYPES from '../constants/types'; // Criaremos esse arquivo em seguida

const router = express.Router();
const container = new Container();

// Middleware de log global
router.use(LoggerMiddleware.log);

// Configuração de Injeção de Dependência
// container.bind<UserController>(TYPES.UserController).to(UserController).inSingletonScope();

// // Rotas públicas (sem autenticação)
// router.post('/users', container.get<UserController>(TYPES.UserController).createUser);
// router.post('/users', signUpValidation, [UserValidator.validateUser, container.get<UserController>(TYPES.UserController).createUser]);

// // Rotas protegidas (requerem autenticação)
router.use(AuthMiddleware.authenticate);
router.get('/users/:id', container.get<UserController>(TYPES.UserController).getUserById);

export default router;
