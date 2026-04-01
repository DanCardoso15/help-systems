const express = require('express');
const router = express.Router();
const pool = require('../db/pool');

// RF02.1: Tela Inicial
router.get('/home', async (req, res) => {
    if (!req.session.usuario) {
        return res.redirect('/login');
    }

    try {
        const { departamento, titulo, colaborador, categoria, ordem } = req.query;

        let sql = `SELECT s.IDsolicitacao, s.titulo_pergunta, s.pergunta, s.departamento, s.nome, s.categoria, s.data_criacao
                    FROM solicitacoes s WHERE 1=1`;
        const params = [];

        // RF05.2: Filtros
        if (departamento) {
            sql += ' AND s.departamento = ?';
            params.push(departamento);
        }

        if (categoria) {
            sql += ' AND s.categoria = ?';
            params.push(categoria);
        }

        if (titulo) {
            sql += ' AND s.titulo_pergunta LIKE ?';
            params.push(`%${titulo}%`);
        }

        if (colaborador) {
            sql += ' AND s.nome LIKE ?';
            params.push(`%${colaborador}%`);
        }

        // RF05.3: Ordenacao
        if (ordem === 'asc') {
            sql += ' ORDER BY s.data_criacao ASC';
        } else {
            sql += ' ORDER BY s.data_criacao DESC';
        }

        const [solicitacoes] = await pool.query(sql, params);

        res.render('home', {
            solicitacoes,
            filtros: { departamento: departamento || '', titulo: titulo || '', colaborador: colaborador || '', categoria: categoria || '', ordem: ordem || 'desc' }
        });
    } catch (err) {
        console.error(err);
        res.render('home', {
            solicitacoes: [],
            filtros: { departamento: '', titulo: '', colaborador: '', categoria: '', ordem: 'desc' }
        });
    }
});

module.exports = router;
