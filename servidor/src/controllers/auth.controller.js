const db = require("../config/database")
function login(req, res) {
    const { username, password } = req.body;

    console.log("LOGIN HIT");
    db.query("SELECT id, username, grade FROM datos_usuario WHERE username=? AND password=?",[username, password], (err, rows) => {
            console.log("LOGIN CALLBACK", { err, rowsLen: rows?.length });
            if (err) return res.status(500).send("DB error", err);
            if (rows.length === 0) return res.status(401).send("Invalid credentials");

            res.json(rows[0]); // Send user data without password
        }
    );
}

module.exports = {login};
