let connection = require("../config/db")
let moment = require("moment")

class Message {
    constructor(row) {
        this.row = row
    }

    get id () {
        return this.row.id
    }

    get auteur () {
        return this.row.auteur
    }

    get content () {
        return this.row.content
    }

    get created_at () {
        return moment(this.row.created_at).calendar();
    }

    static create(content, cb, auteur) {
        connection.query('INSERT INTO messages SET content = ?, created_at = ?, auteur = ?', [content, new Date(), auteur], (err, result) => {
            if (err) throw err
            cb(result)
        })
    }

    static all(cb) {
        connection.query('SELECT * FROM messages', (err, rows) => {
            if (err) throw err
            cb(rows.map((row) => new Message(row)))
        })
    }

    static find(id, cb) {
        connection.query('SELECT * FROM messages WHERE id = ? LIMIT 1', [id], (err, rows) => {
            if (err) throw err
            cb(new Message(rows[0]))
        })
    }
}

module.exports = Message;