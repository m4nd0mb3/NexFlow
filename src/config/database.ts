import { createConnection } from 'typeorm';
import { DataSource } from "typeorm"

// export const MysqlDataSource = new DataSource({
//     type: "mysql",
//     host: "localhost",
//     port: 3306,
//     username: "test",
//     password: "test",
//     database: "test",
//     entities: [
//         // ....
//     ],
// })

export const PostgresDataSource = new DataSource({
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "postgres",
    "database": "nex_flow",
    "synchronize": true,
    "logging": false,
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
})
// export const connectDatabase = async () => {
//   await createConnection();
// };

// PostgresDataSource.initialize()
//     .then(() => {
//         console.log("Data Source has been initialized!")
//     })
//     .catch((err) => {
//         console.error("Error during Data Source initialization", err)
//     })