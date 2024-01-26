import { validationResult, body, check } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { SignInUser, User } from '../entities/User';

export class UserValidator {
    static validateUser(req: Request, res: Response, next: NextFunction): void {
        // Defina suas regras de validação aqui usando express-validator
        body('name').notEmpty().withMessage('Nome é obrigatório').run(req);
        body('email').isEmail().withMessage('Email inválido').run(req);
        body('password').isLength({ min: 6 }).withMessage('A senha deve ter no mínimo 6 caracteres').run(req);

        // Verifica os erros de validação
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }

        // Se a validação passar, chama o próximo middleware
        next();
    }
}

export const signUpValidation = [
    check("name", "O campo 'name' é obrigatório.").not().isEmpty(),
    check("email", "O campo 'email' deve ser um endereço de e-mail válido.")
        .isEmail()
        .normalizeEmail({ gmail_remove_dots: true }),

    check(
        "password",
        "O campo 'password' deve ter pelo menos 8 caracteres."
    ).isLength({ min: 8 }),
];

export const userValidationMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { name, email, password } = req.body;

    // Criar uma instância do usuário
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;

    // Executar validação
    const errors = await validate(user);
    if (errors.length > 0) {
        // Se houver erros de validação, envie uma resposta de erro
        res.status(400).json({ errors });
    } else {
        // Se não houver erros, continue para o próximo middleware ou rota
        next();
    }
};

export const signInUserValidationMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { email, password } = req.body;

    // Criar uma instância do usuário
    const user = new SignInUser();
    user.email = email;
    user.password = password;

    // Executar validação
    const errors = await validate(user);
    if (errors.length > 0) {
        // Se houver erros de validação, envie uma resposta de erro
        res.status(400).json({ errors });
    } else {
        // Se não houver erros, continue para o próximo middleware ou rota
        next();
    }
};
