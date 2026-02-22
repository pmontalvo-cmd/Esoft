const router = require("express").Router();
const usersController = require("../controllers/user.controller");

router.post("/create", usersController.createUser);
router.get("/alumnos", usersController.getAllUsers);
router.put("/update", usersController.updateUser);
router.delete("/delete/:id", usersController.deleteUser);

module.exports = router;
