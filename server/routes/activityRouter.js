const activityController = require("../controllers/activityController");
const router = require('express').Router();

router.get('/', activityController.get);

module.exports = router;
