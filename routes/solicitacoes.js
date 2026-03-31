const express = require('express');
const router = express.Router();
const pool = require('../db/pool');

// RF03.1: Formulario de solicitacao
router.get('/solicitacoes/nova', (req, res) => {
    if (!req.session.usuario) {
        return res.redirect('/login');
    }
    res.render('nova-solicitacao', { erro: null, sucesso: null });
});

// RF03.2, RF03.3, RF03.4: Salvar solicitacao
router.post('/solicitacoes/nova', async (req, res) => {
    if (!req.session.usuario) {
        return res.redirect('/login');
    }

    const { titulo_pergunta, pergunta } = req.body;

    // RF03.2: Campos obrigatorios
    if (!titulo_pergunta || !pergunta) {
        return res.render('nova-solicitacao', {
            erro: 'Todos os campos sao obrigatorios.',
            sucesso: null
        });
    }

    try {
        // RF03.3: Salvar no banco
        await pool.query(
            'INSERT INTO solicitacoes (titulo_pergunta, pergunta, nome, departamento, usuario_id) VALUES (?, ?, ?, ?, ?)',
            [titulo_pergunta, pergunta, req.session.usuario.nome, req.session.usuario.departamento, req.session.usuario.id]
        );

        // RF03.4: Retornar confirmacao
        res.render('nova-solicitacao', {
            erro: null,
            sucesso: 'Solicitacao registrada com sucesso!'
        });
    } catch (err) {
        console.error(err);
        res.render('nova-solicitacao', {
            erro: 'Erro ao registrar solicitacao. Tente novamente.',
            sucesso: null
        });
    }
});

module.exports = router;
