const { Client } = require('pg')
const db_config = require("../config/app")

module.exports = class Db {
    connect = () => {
        const client = new Client(db_config)
        client.connect(err => {
            if (err) {
                console.log('problème connexion a la db', err.stack)
            }
            else {
                console.log('connexion db ok')
            }
        })
        return client;
    }
}