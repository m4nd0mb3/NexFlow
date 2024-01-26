"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = exports.PostgresDataSource = exports.MysqlDataSource = void 0;
const typeorm_1 = require("typeorm");
const typeorm_2 = require("typeorm");
exports.MysqlDataSource = new typeorm_2.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "test",
    password: "test",
    database: "test",
    entities: [
    // ....
    ],
});
exports.PostgresDataSource = new typeorm_2.DataSource({
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "postgres",
    "database": "nex_flow",
    "synchronize": true,
    "logging": true,
    "entities": [
        "src/entities/*.ts"
    ],
    "migrations": [
        "src/migrations/*.ts"
    ],
    "subscribers": [
        "src/subscribers/*.ts"
    ],
    // "cli": {
    //     "entitiesDir": "src/entities",
    //     "migrationsDir": "src/migrations",
    //     "subscribersDir": "src/subscribers"
    // }
});
const connectDatabase = async () => {
    await (0, typeorm_1.createConnection)();
};
exports.connectDatabase = connectDatabase;
exports.PostgresDataSource.initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
})
    .catch((err) => {
    console.error("Error during Data Source initialization", err);
});
//# sourceMappingURL=database.js.map