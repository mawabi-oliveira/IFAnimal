const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcrypt');

const dbPath = path.join(__dirname, 'ifanimal.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS admin (id INTEGER PRIMARY KEY, username TEXT, password TEXT)`);
    
    db.run(`CREATE TABLE IF NOT EXISTS gatos (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        nome TEXT, idade TEXT, origem TEXT, 
        foto TEXT, status TEXT DEFAULT 'disponivel'
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS adocoes (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        gato_id INTEGER, nome_adotante TEXT, 
        email TEXT, telefone TEXT, status TEXT DEFAULT 'pendente'
    )`);

    // Inserir Admin Padrão com senha criptografada (123)
    db.get("SELECT * FROM admin WHERE username = 'admin'", async (err, row) => {
        if (!row) {
            const hash = await bcrypt.hash('123', 10);
            db.run("INSERT INTO admin (username, password) VALUES (?, ?)", ['admin', hash]);
        }
    });
});

module.exports = db;