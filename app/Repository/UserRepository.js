const Db = require('../../bootstrap/Db')

class UserRepository {

    constructor(){
        const db = new Db();
        this.client = db.connect();
    }

    get = (id) => {
        return this.client.query({
            text: "SELECT * FROM users WHERE id = $1",
            values: [id]
        })
        .then(res => {
            return res.rows[0];
        })
        .catch(err => console.error(err));
    }

    all = () => {
        return this.client.query('SELECT * FROM users').then(res => {return res.rows}).catch(err => console.error(err));
    }

    update = (id, user) => {
        const query = "UPDATE users SET name=$1, email=$2 " + (user.password? ", password=$3 WHERE id=$4" : "WHERE id=$3");
        const values = user.password? [user.name, user.email, user.password, id] : [user.name, user.email, id];
        return this.client.query({
            text: query,
            values: values
        }).then(() => {
            return this.client.query({
                text: "SELECT * FROM users WHERE id = $1",
                values: [id]
            })
            .then(res => {
                return res.rows[0]
            })
            .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
    }

    create = (user) => {
        return this.client.query({
            text: 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
            values: [user.name, user.email, user.password]
        }).then(() => {
            return this.client.query('SELECT * FROM users ORDER BY 1 DESC LIMIT 1')
            .then(res => {
                return res.rows[0]
            })
            .catch(err => console.error(err))
        }).catch(err => console.error(err))
    }

    delete = (id) => {
        return this.client.query({
            text: 'DELETE FROM users where id = $1',
            values: [id]
        }).then(res => {return res.rowCount == 1}).catch(err => console.error(err));
    }

}

module.exports = UserRepository;