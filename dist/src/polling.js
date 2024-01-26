"use strict";
const express = require('express');
const app = express();
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/polling.html');
});
// Simulando notificação (endpoint de polling)
app.get('/polling', (req, res) => {
    // Simulando envio de notificação para o cliente
    setTimeout(() => {
        res.json({ message: 'Nova notificação' });
    }, 5000);
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor de Polling rodando em http://localhost:${PORT}`);
});
//# sourceMappingURL=polling.js.map