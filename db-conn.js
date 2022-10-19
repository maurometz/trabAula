var sqlite3 = require('sqlite3');

class DBConn {

    constructor() {
        this.db = new sqlite3.Database('db/dev.db');
    }

    createTables() {
        var sql = `CREATE TABLE IF NOT EXISTS users (
            "id" INTEGER,
            "username"	TEXT,
            "name"	TEXT,
            "password"	TEXT,
            "email"	TEXT,
            PRIMARY KEY("id"))`;

        return this.db.run(sql);
    }
    
    findAllUsers(callback) {
        let sql = this.db.prepare(`SELECT * FROM users ORDER BY id`);
        sql.run()
        sql.finalize();
        return callback();

    }

    getUserById(id, callback) {
        let sql = this.db.prepare(`SELECT * FROM users WHERE id = (?)`);
        sql.run(id)
        sql.finalize();
        return callback();

    }    

    createUser(name, username, password, email, callback) {
        let sql = this.db.prepare(`INSERT INTO users (username, name, password, email) VALUES (?, ?, ?, ?)`);
        sql.run(name, username, password, email)
        sql.finalize();
        return callback();
    }

    deleteUser(id, callback) {
        let sql = this.db.prepare(`DELETE FROM users WHERE ID = (?)`);
        sql.run(id)
        sql.finalize();
        return callback();
    }    

}

module.exports = DBConn