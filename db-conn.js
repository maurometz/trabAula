var sqlite3 = require('sqlite3');

class DBConn {

    constructor() {
        this.db = new sqlite3.Database('db/dev.db');
    }

    createTables() {
        var sql = `CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT)`;

        return this.db.run(sql);
    }
    
    findAllEventos(callback) {

        var sql = "SELECT * FROM users";
        return this.db.all(sql, [], callback);

    }

    getEventoById(id, callback) {

        var sql = "SELECT * FROM users WHERE id = (?)";
        return this.db.get(sql, [id], callback);

    }    

    createEvento(name, username, password, email, callback) {

        var sql = "INSERT INTO users (id, username, name, password, email) VALUES (?, ?, ?, ?, ?)";
        // var sql = `INSERT INTO users (name, username, password, email) VALUES( '${name}', '${username}', '${password}', '${email}');`;
        return this.db.run(sql, [`${name}, ${username}, ${password}, ${email}`], callback);

    }

    deleteEvento(id, callback) {

        var sql = "DELETE FROM users WHERE ID = (?)";
        return this.db.run(sql, [id], callback);

    }    

}

module.exports = DBConn