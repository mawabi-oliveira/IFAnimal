require('dotenv').config();
const express = require('express');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
const path = require('path');
const apiRoutes = require('./routes/api');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/views', express.static(path.join(__dirname, 'views')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(session({
    store: new SQLiteStore({ db: 'sessions.db', dir: path.join(__dirname, 'db') }),
    secret: process.env.SESSION_SECRET || 'chave_secreta_padrao',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } 
}));

app.get('/api/gatos/adotados', (req, res) => {
    db.all("SELECT * FROM gatos WHERE status = 'adotado'", [], (err, rows) => {
        if (err) return res.status(500).send(err);
        res.json(rows);
    });
});

// Rota raiz
app.get('/', (req, res) => res.redirect('/views/home.html'));

// Usa o arquivo de rotas (MVC)
app.use('/api', apiRoutes);

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));