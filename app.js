const express = require('express');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 2 }
}));

app.use((req, res, next) => {
    res.locals.usuario = req.session.usuario || null;
    next();
});

const authRoutes = require('./routes/auth');
const homeRoutes = require('./routes/home');
const solicitacoesRoutes = require('./routes/solicitacoes');
const respostasRoutes = require('./routes/respostas');
app.use('/', authRoutes);
app.use('/', homeRoutes);
app.use('/', solicitacoesRoutes);
app.use('/', respostasRoutes);

app.get('/', (req, res) => {
    if (!req.session.usuario) {
        return res.redirect('/login');
    }
    res.redirect('/home');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
