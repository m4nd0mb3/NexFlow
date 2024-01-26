"use strict";
// const express = require('express');
// const axios = require('axios');
// const { setupLogging } = require("./common/utils/logging");
// const app = express();
// const port = 3001;
// setupLogging(app);
// // URL do serviço de autenticação
// const authServiceUrl = 'http://localhost:3000';
// // Middleware para validar o token
// // @ts-ignore
// async function validateTokenMiddleware(req, res, next) {
//     const token = req.header('Authorization');
//     if (!token) return res.status(401).json({ error: 'Token não fornecido' });
//     try {
//         // @ts-ignore
//         const response = await axios.post(`${authServiceUrl}/validate-token`, { token });
//         if (response.data.valid) {
//             req.user = response.data.decoded;
//             next();
//         } else {
//             res.status(401).json({ error: 'Token inválido' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: 'Erro ao validar o token' });
//     }
// }
// app.use(express.json());
// // Rota protegida
// app.get('/protegido', validateTokenMiddleware, (req, res) => {
//     // @ts-ignore
//     res.json({ detail: `Olá, ${req.user.username}! Esta rota é protegida.` });
// });
// app.listen(port, () => {
//     console.log(`Serviço protegido rodando em http://localhost:${port}`);
// });
//# sourceMappingURL=protected-service.js.map