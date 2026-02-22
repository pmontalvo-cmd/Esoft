require("dotenv").config();
const app = require ("./app.js")

// Start Server
app.listen(3002, () => { console.log("Corriendo en le puerto 3002") });