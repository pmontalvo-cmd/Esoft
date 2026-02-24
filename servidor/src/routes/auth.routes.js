const router = require("express").Router();
const authController = require("../controllers/auth.controller");

// router.post("/login", authController.login);
router.post("/login", (req, res) => {
  console.log("LOGIN BODY:", req.body);
  return res.json({ ok: true });
});
module.exports = router;
