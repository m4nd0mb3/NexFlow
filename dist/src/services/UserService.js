"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const UserRepository_1 = require("../repositories/UserRepository");
class UserService {
    constructor() {
        this.userRepository = UserRepository_1.UserRepository;
    }
    async createUser(name, email, password) {
        const user = this.userRepository.create({ name, email, password });
        return this.userRepository.save(user);
    }
    async getUserById(userId) {
        return this.userRepository.findOneBy({ id: userId });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map