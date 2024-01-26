"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/routes.ts
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controllers/UserController");
const LoggerMiddleware_1 = require("../middlewares/LoggerMiddleware");
const AuthMiddleware_1 = require("../auth/AuthMiddleware");
const UserValidator_1 = require("../validators/UserValidator");
const inversify_1 = require("inversify");
const types_1 = __importDefault(require("../constants/types")); // Criaremos esse arquivo em seguida
const router = express_1.default.Router();
const container = new inversify_1.Container();
// Middleware de log global
router.use(LoggerMiddleware_1.LoggerMiddleware.log);
// Configuração de Injeção de Dependência
container.bind(types_1.default.UserController).to(UserController_1.UserController).inSingletonScope();
// Rotas públicas (sem autenticação)
router.post('/users', [UserValidator_1.UserValidator.validateUser, container.get(types_1.default.UserController).createUser]);
// Rotas protegidas (requerem autenticação)
router.use(AuthMiddleware_1.AuthMiddleware.authenticate);
router.get('/users/:id', container.get(types_1.default.UserController).getUserById);
exports.default = router;
//# sourceMappingURL=routes.js.map