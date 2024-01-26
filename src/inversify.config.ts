// src/inversify.config.ts
import { Container } from 'inversify';
import { UserService } from './services/UserService';
import { LoggerMiddleware } from './middlewares/LoggerMiddleware';
import { UserController } from './controllers/UserController';
import TYPES from './constants/types';

const container = new Container();

// Configuração de Injeção de Dependência
container.bind<UserService>(TYPES.UserService).to(UserService).inSingletonScope();
// container.bind<UserService>(UserService).toSelf();
container.bind<LoggerMiddleware>(LoggerMiddleware).to(LoggerMiddleware).inSingletonScope();
container.bind(UserController).toSelf();

export default container;
