"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidator = void 0;
const express_validator_1 = require("express-validator");
class UserValidator {
    static validateUser(req, res, next) {
        // Defina suas regras de validação aqui usando express-validator
        (0, express_validator_1.body)('name').notEmpty().withMessage('Nome é obrigatório').run(req);
        (0, express_validator_1.body)('email').isEmail().withMessage('Email inválido').run(req);
        (0, express_validator_1.body)('password').isLength({ min: 6 }).withMessage('A senha deve ter no mínimo 6 caracteres').run(req);
        // Verifica os erros de validação
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }
        // Se a validação passar, chama o próximo middleware
        next();
    }
}
exports.UserValidator = UserValidator;
//# sourceMappingURL=UserValidator.js.map