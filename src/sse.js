const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/sse.html');
});

app.get('/sse', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
    });

    // Simulando envio de notificação para o cliente
    setInterval(() => {
        res.write(`data: ${JSON.stringify({ message: 'Nova notificação' })}\n\n`);
    }, 5000);
    
});

app.get('/sse/:userKey', (req, res) => {
    // Simulando autenticação de usuário
    const userKey = req.params.userKey;

    // Associar o usuário a um canal específico (pode ser baseado em grupos, IDs, etc.)
    const channel = `user_${userKey}`;

    // Salvar a associação no mapa
    userChannels.set(userKey, res);

    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
    });

    // Simulando envio de notificação para o cliente
    setInterval(() => {
        res.write(`data: ${JSON.stringify({ message: 'Nova notificação para o usuário' })}\n\n`);
    }, 5000);

    // Fechar a conexão quando o cliente se desconectar
    req.on('close', () => {
        console.log(`Conexão fechada para o usuário ${userKey}`);
        userChannels.delete(userKey);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor SSE rodando em http://localhost:${PORT}`);
});
