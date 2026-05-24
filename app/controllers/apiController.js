const db = require('../db/database');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

module.exports = {
    // --- ADMIN ---
    login: (req, res) => {
        const { username, password } = req.body;
        db.get("SELECT * FROM admin WHERE username = ?", [username], async (err, row) => {
            if (row && await bcrypt.compare(password, row.password)) {
                req.session.adminId = row.id;
                res.json({ success: true });
            } else {
                res.status(401).json({ success: false, message: "Credenciais inválidas" });
            }
        });
    },
    checkAuth: (req, res) => res.json({ authenticated: !!req.session.adminId }),
    logout: (req, res) => { req.session.destroy(); res.json({ success: true }); },

    // --- GATOS ---
    cadastrarGato: (req, res) => {
        if (!req.session.adminId) return res.status(403).json({ error: 'Não autorizado' });
        const { nome, idade, origem } = req.body;
        const foto = `/uploads/${req.file.filename}`;
        db.run(`INSERT INTO gatos (nome, idade, origem, foto, status) VALUES (?, ?, ?, ?, 'disponivel')`, [nome, idade, origem, foto], function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID, sucesso: true });
        });
    },

    listarGatosPublico: (req, res) => {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        db.all("SELECT * FROM gatos WHERE status = 'disponivel' LIMIT ? OFFSET ?", [limit, offset], (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            db.get("SELECT COUNT(*) as total FROM gatos WHERE status = 'disponivel'", [], (err, countRow) => {
                res.json({ gatos: rows, page: page, totalPages: Math.ceil((countRow ? countRow.total : 0) / limit) });
            });
        });
    },

    listarGatosAdmin: (req, res) => {
        if (!req.session.adminId) return res.status(403).json({ error: 'Não autorizado' });
        db.all("SELECT * FROM gatos", [], (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        });
    },

    editarGato: (req, res) => {
        if (!req.session.adminId) return res.status(403).json({ error: 'Não autorizado' });
        db.run("UPDATE gatos SET nome = ?, idade = ?, origem = ? WHERE id = ?", [req.body.nome, req.body.idade, req.body.origem, req.params.id], function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ sucesso: true });
        });
    },

    marcarAdotado: (req, res) => {
        if (!req.session.adminId) return res.status(403).json({ error: 'Não autorizado' });
        db.run("UPDATE gatos SET status = 'adotado' WHERE id = ?", [req.params.id], (err) => {
            if (err) return res.status(500).json({ error: err.message });
            db.run("UPDATE adocoes SET status = 'concluido' WHERE gato_id = ?", [req.params.id], () => res.json({ sucesso: true }));
        });
    },

    // --- ADOÇÕES ---
    enviarPedido: (req, res) => {
        const { gato_id, nome_adotante, email, telefone } = req.body;
        db.run(`INSERT INTO adocoes (gato_id, nome_adotante, email, telefone) VALUES (?, ?, ?, ?)`, [gato_id, nome_adotante, email, telefone], function(err) {
            res.json({ sucesso: true });
        });
    },

    listarPedidosAdmin: (req, res) => {
        if (!req.session.adminId) return res.status(403).json({ error: 'Não autorizado' });
        db.all(`SELECT a.*, g.nome as gato_nome FROM adocoes a JOIN gatos g ON a.gato_id = g.id WHERE a.status = 'pendente'`, [], (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        });
    }
};