const router = require("express").Router();
const dashboardController = require('../controllers/dashboard.controller');

router.get("/api/learningblocks", dashboardController.getAllBlocks);
router.get("/api/learningblocks/:id", dashboardController.getBlockById);

router.get("/api/dashboard/:userId", dashboardController.getDashboard);
router.get("/api/dashboard/:userId/search", dashboardController.searchBlocks);
module.exports = router;