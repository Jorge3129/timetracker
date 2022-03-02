const {connection} = require('../config');
const bcrypt = require('bcrypt');

class AuthController {
    async register(req, res) {
        const {username, password} = req.body;
        await connection.query(
            `SELECT username FROM users WHERE username = ?`, [username],
            async (err, results) => {
                if (err) return console.log(err);
                if (results.length > 0) return res.status(409).json('Username already exists');
                const hashedPassword = await bcrypt.hash(password, 7);
                await connection.query(
                    `INSERT INTO users (username, password) VALUES (?,?);`,
                    [username, hashedPassword],
                    (err, results) => {
                        if (err) return console.log(err);
                        res.status(200).json({msg:'Success', success: true, results});
                    })
            }
        )
    }

    async login(req, res) {
        const {username, password} = req.body;
        await connection.query(
            `SELECT userID, username, password FROM users WHERE username = ?;`, [username],
            (err, results) => {
                if (err) return console.log(err);
                if (results.length === 0) return res.status(401).json({msg:'Username does not exist', success: false});
                const check = bcrypt.compareSync(password, results[0]['password']);
                if (check) {
                    req.session.loggedIn = true;
                    req.session.username = username;
                    res.cookie('userID', results[0]['userID'])
                    res.status(200).json({msg:'Success', success: true, results});
                } else {
                    res.status(401).json({msg:'Incorrect password:/', success: false})
                }
            });
    }
}

module.exports = new AuthController()
