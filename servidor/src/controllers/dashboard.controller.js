const db = require("../config/database")

function getDashboard(req, res){
try {
        const {userId} = req.body;
        if(userId == null){
            return res.status(400).json({
                ok: false,
                message: "Mising userId"
        });
    }
    // Check if User Id exists in database
    db.query("SELECT * FROM datos_usuario WHERE id = ?", [userId], (err,rows) => {
        if (err) return res.status(500).json({ error: "DB error" });
        if (rows.length === 0) return res.status(404).json({ error: "User not found" })
        
    db.query("SELECT math_score, language_score FROM datos_usuario WHERE id = ?", [userId], (err,rows) => {
        if (err) return res.status(500).json({ error: "DB error"});
        if (rows.length === 0) return res.status(404).json({ error: "User Scores not found"})

        const {math_score, language_score} = rows[0];
        return res.status(200).json({userId, math_score, language_score})

        
    })});

}catch (err) {
    console.error(err);
    return res.status(500).json({
    ok: false,
    message: "Internal server error",
    });
}};

function getRecomendedBlocks(req, res){


}
module.exports = {getDashboard}