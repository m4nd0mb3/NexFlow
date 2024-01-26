"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const User_1 = require("../entities/User");
const database_1 = require("../config/database");
exports.UserRepository = database_1.PostgresDataSource.getRepository(User_1.User).extend({
    findByName(firstName, lastName) {
        return this.createQueryBuilder("user")
            .where("user.firstName = :firstName", { firstName })
            .andWhere("user.lastName = :lastName", { lastName })
            .getMany();
    },
});
//# sourceMappingURL=UserRepository.js.map