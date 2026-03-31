const express = require('express');
const router = express.Router();
const pool = require('../db/pool');

// RF04.1: Listar solicitacoes para responder
router.get('/respostas', async (req, res) => {
    if (!req.session.usuario) {
        return res.redirect('/login');
    }

    try {
        const [solicitacoes] = await pool.query(
            `SELECT IDsolicitacao, titulo_pergunta, pergunta, nome, departamento
             FROM solicitacoes
             ORDER BY IDsolicitacao DESC`
        );

        res.render('respostas', { solicitacoes });
    } catch (err) {
        console.error(err);
        res.render('respostas', { solicitacoes: [] });
    }
});

// RF04.1: Formulario para responder uma solicitacao
router.get('/respostas/:id', async (req, res) => {
    if (!req.session.usuario) {
        return res.redirect('/login');
    }

    try {
        const [rows] = await pool.query(
            'SELECT IDsolicitacao, titulo_pergunta, pergunta, nome, departamento FROM solicitacoes WHERE IDsolicitacao = ?',
            [req.params.id]
        );

        if (rows.length === 0) {
            return res.redirect('/respostas');
        }

        res.render('responder', { solicitacao: rows[0], erro: null, sucesso: null });
    } catch (err) {
        console.error(err);
        res.redirect('/respostas');
    }
});

// RF04.2, RF04.3: Salvar resposta
router.post('/respostas/:id', async (req, res) => {
    if (!req.session.usuario) {
        return res.redirect('/login');
    }

    const { resposta } = req.body;

    if (!resposta) {
        const [rows] = await pool.query(
            'SELECT IDsolicitacao, titulo_pergunta, pergunta, nome, departamento FROM solicitacoes WHERE IDsolicitacao = ?',
            [req.params.id]
        );
        return res.render('responder', {
            solicitacao: rows[0],
            erro: 'O campo de resposta e obrigatorio.',
            sucesso: null
        });
    }

    try {
        const [rows] = await pool.query(
            'SELECT titulo_pergunta, pergunta, departamento FROM solicitacoes WHERE IDsolicitacao = ?',
            [req.params.id]
        );

        await pool.query(
            'INSERT INTO respostas (titulo_pergunta, pergunta, resposta, departamento, solicitacao_id, usuario_id) VALUES (?, ?, ?, ?, ?, ?)',
            [rows[0].titulo_pergunta, rows[0].pergunta, resposta, rows[0].departamento, req.params.id, req.session.usuario.id]
        );

        // RF04.3: Notificacao de conclusao
        const [solicitacao] = await pool.query(
            'SELECT IDsolicitacao, titulo_pergunta, pergunta, nome, departamento FROM solicitacoes WHERE IDsolicitacao = ?',
            [req.params.id]
        );

        res.render('responder', {
            solicitacao: solicitacao[0],
            erro: null,
            sucesso: 'Resposta enviada com sucesso!'
        });
    } catch (err) {
        console.error(err);
        res.redirect('/respostas');
    }
});

module.exports = router;
