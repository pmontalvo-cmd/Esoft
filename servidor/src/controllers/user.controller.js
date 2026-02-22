const db = require("../config/database")


// Register New User
function createUser(req, res) {
    const { first_name, middle_name, last_name, age, grade, takes_math, takes_lenguage, username, password } = req.body;
    
    const userData = {
        first_name, middle_name, last_name,
        age: age || 1,
        grade: grade || 1,
        takes_math: takes_math || 1,
        takes_lenguage: takes_lenguage || 1,
        username, password
    };

    db.query(
        "INSERT INTO datos_usuario (first_name, middle_name, last_name, age, grade, takes_math, takes_lenguage, username, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        Object.values(userData),
        (err) => {
            if (err) return res.status(500).send("DB error");
            res.send("Registrado!");
        }
    );
}

// Get All Users
function getAllUsers(req, res) {
    db.query("SELECT * FROM datos_usuario", (err, result) => {
        if (err) return res.status(500).send("DB error");
        res.send(result);
    });
}

// Update User Info
function updateUser(req, res) {
    const { id, first_name, middle_name, last_name, age, grade, takes_math, takes_lenguage, username, password } = req.body;

    db.query(
        "UPDATE datos_usuario SET first_name=?, middle_name=?, last_name=?, age=?, grade=?, takes_math=?, takes_lenguage=?, username=?, password=? WHERE id=?",
        [first_name, middle_name, last_name, age, grade, takes_math, takes_lenguage, username, password, id],
        (err) => {
            if (err) return res.status(500).send("DB error");
            res.send("Actualizado!");
        }
    );
}

// Delete User
function deleteUser(req, res) {
    db.query("DELETE FROM datos_usuario WHERE id=?", [req.params.id], (err, result) => {
        if (err) return res.status(500).send("DB error");
        res.send(result);
    });
}

module.exports = {
    createUser, getAllUsers, updateUser, deleteUser
};