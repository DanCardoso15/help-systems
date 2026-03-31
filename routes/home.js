const express = require('express');
const router = express.Router();
const pool = require('../db/pool');

// RF02.1: Tela Inicial
router.get('/home', async (req, res) => {
    if (!req.session.usuario) {
        return res.redirect('/login');
    }

    try {
        // RF02.4: Listagem de solicitacoes
        const [solicitacoes] = await pool.query(
            `SELECT s.IDsolicitacao, s.titulo_pergunta, s.pergunta, s.departamento, s.nome
             FROM Solicitacoes s
             ORDER BY s.IDsolicitacao DESC`
        );

        res.render('home', { solicitacoes });
    } catch (err) {
        console.error(err);
        res.render('home', { solicitacoes: [] });
    }
});

module.exports = router;
