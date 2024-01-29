import { DataSource } from "typeorm"
import * as dotenv from 'dotenv';
dotenv.config();

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
    "type": 'postgres',
    "host": process.env.POSTGRES_SERVER as string,
    "port": Number.parseInt(process.env.POSTGRES_PORT),
    "username": process.env.POSTGRES_USER as string,
    "password": process.env.POSTGRES_PASSWORD as string,
    "database": process.env.POSTGRES_DB as string,
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


// PostgresDataSource.initialize()
//     .then(() => {
//         console.log("Data Source has been initialized!")
//     })
//     .catch((err) => {
//         console.error("Error during Data Source initialization", err)
//     })