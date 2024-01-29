// src/app.ts
import 'reflect-metadata';
import express from 'express';
import { PostgresDataSource } from './config/database';
import container from './inversify.config';
import { InversifyExpressServer } from 'inversify-express-utils';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';
const server = new InversifyExpressServer(container);
import * as dotenv from 'dotenv';
dotenv.config();

// const app = express();

server.setConfig((app) => {
    app.use(express.json());
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
});

const app = server.build();
const port = Number.parseInt(process.env.PORT);
// Conectar ao banco de dados
// connectDatabase();
// Middlewares
// app.use(express.json());
// app.use('/api', routes);

PostgresDataSource.initialize().then(async () => {

    console.log("Inserting a new user into the database...")
    // const user = new User()
    // user.firstName = "Timber"
    // user.lastName = "Saw"
    // user.age = 25
    // await PostgresDataSource.manager.save(user)
    // console.log("Saved a new user with id: " + user.id)

    console.log("Loading users from the database...")
    // const users = await PostgresDataSource.manager.find(User)
    // console.log("Loaded users: ", users)

    console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))


// Iniciar o servidor
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
