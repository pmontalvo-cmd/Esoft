const router = require("express").Router();
const alumnosController = require("../controllers/alumnos.controller");

router.get("/alumnos", alumnosController.getAlumnos);
router.post("/create", alumnosController.createAlumno);
router.delete("/delete/:id", alumnosController.deleteAlumno);

module.exports = router;