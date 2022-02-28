const authController = require("./authController");
const router = require('express').Router();

router.get('/', authController.foo);
router.post('/', authController.foo);

module.exports = router;
