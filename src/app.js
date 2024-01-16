const express = require('express')

const { ROUTES } = require("./routes/index");

const { setupLogging } = require("./common/utils/logging");
const { setupAuth } = require("./common/middlewares/auth");
const { setupProxies } = require("./proxies/proxy");

const app = express()
const port = 3000;

const jwt = require('jsonwebtoken');
const secretKey = 'suaChaveSecreta';

app.use(express.json());

setupLogging(app);
setupAuth(app, ROUTES);
setupProxies(app, ROUTES);

app.get('/hello', (req, resp) => {
    return resp.send('HELLO WORLD!');
})


// Função para gerar um token
function generateToken(username) {
    return jwt.sign({ username }, secretKey, { expiresIn: '1h' });
}

// Rota de login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Simule um processo de autenticação
    if (username === 'usuario123' && password === 'senha123') {
        const token = generateToken(username);
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Credenciais inválidas' });
    }
});

// Rota para validar tokens
app.post('/validate-token', (req, res) => {
    const token = req.body.token;

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            res.status(401).json({ valid: false });
        } else {
            res.json({ valid: true, decoded });
        }
    });
});

app.listen(port, () => {
    console.log(`NexFlow app listening at http://localhost:${port}`)
})