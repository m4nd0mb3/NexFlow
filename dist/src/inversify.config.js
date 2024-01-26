"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/inversify.config.ts
const inversify_1 = require("inversify");
const UserService_1 = require("./services/UserService");
const LoggerMiddleware_1 = require("./middlewares/LoggerMiddleware");
const container = new inversify_1.Container();
// Configuração de Injeção de Dependência
container.bind(UserService_1.UserService).to(UserService_1.UserService).inSingletonScope();
container.bind(LoggerMiddleware_1.LoggerMiddleware).to(LoggerMiddleware_1.LoggerMiddleware).inSingletonScope();
exports.default = container;
//# sourceMappingURL=inversify.config.js.map