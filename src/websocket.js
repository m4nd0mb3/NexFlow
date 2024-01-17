const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const userChannels = new Map();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/websocket.html');
});

io.on('connection', (socket) => {
    console.log('Novo cliente conectado');
    // Simulando autenticação de usuário
    const userId = socket.handshake.query.userId;
    // const userId = 25;

    // Associar o usuário a um canal específico (pode ser baseado em grupos, IDs, etc.)
    const channel = `user_${userId}`;

    // Salvar a associação no mapa
    userChannels.set(userId, channel);

    // Juntar o socket ao canal
    socket.join(channel);

    // Simulando envio de notificação para o cliente
    setInterval(() => {
    // setTimeout(() => {
        io.to(channel).emit('notification', { message: 'Nova notificação', user: userId });
        // socket.emit('notification', { message: 'Nova notificação' });
    }, 5000);

    socket.on('disconnect', () => {
        console.log(`Conexão fechada para o usuário ${userId}`);
        userChannels.delete(userId);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor WebSocket rodando em http://localhost:${PORT}`);
});