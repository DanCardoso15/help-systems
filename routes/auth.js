const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const pool = require('../db/pool');

// Formulario de Login (RF01.2)
router.get('/login', (req, res) => {
    if (req.session.usuario) return res.redirect('/');
    res.render('login', { erro: null });
});

// Login POST
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);

        if (rows.length === 0) {
            return res.render('login', { erro: 'E-mail ou senha invalidos.' });
        }

        const usuario = rows[0];
        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return res.render('login', { erro: 'E-mail ou senha invalidos.' });
        }

        req.session.usuario = {
            id: usuario.IDusuario,
            nome: usuario.nome,
            email: usuario.email,
            departamento: usuario.departamento
        };

        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.render('login', { erro: 'Erro interno. Tente novamente.' });
    }
});

// Formulario de Cadastro (RF01.1)
router.get('/cadastro', (req, res) => {
    if (req.session.usuario) return res.redirect('/');
    res.render('cadastro', { erro: null, sucesso: null });
});

// Cadastro POST (RF01.3 a RF01.6)
router.post('/cadastro', async (req, res) => {
    const { nome, email, senha, confirmarSenha, departamento } = req.body;

    // RF01.3: Validar formato do e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.render('cadastro', { erro: 'Formato de e-mail invalido.', sucesso: null });
    }

    if (senha !== confirmarSenha) {
        return res.render('cadastro', { erro: 'As senhas nao coincidem.', sucesso: null });
    }

    if (senha.length < 6) {
        return res.render('cadastro', { erro: 'A senha deve ter pelo menos 6 caracteres.', sucesso: null });
    }

    try {
        const [existe] = await pool.query('SELECT IDusuario FROM usuarios WHERE email = ?', [email]);
        if (existe.length > 0) {
            return res.render('cadastro', { erro: 'Este e-mail ja esta cadastrado.', sucesso: null });
        }

        // RF01.4: Criptografia de senha (hash)
        const senhaHash = await bcrypt.hash(senha, 10);

        // RF01.5: Salvar dados no banco de dados
        await pool.query(
            'INSERT INTO usuarios (nome, email, senha, departamento) VALUES (?, ?, ?, ?)',
            [nome, email, senhaHash, departamento]
        );

        // RF01.6: Retornar mensagem de sucesso
        res.render('cadastro', { erro: null, sucesso: 'Cadastro realizado com sucesso! Faca login.' });
    } catch (err) {
        console.error(err);
        res.render('cadastro', { erro: 'Erro ao cadastrar. Tente novamente.', sucesso: null });
    }
});

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

module.exports = router;
