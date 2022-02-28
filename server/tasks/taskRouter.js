const taskController = require("./taskController");
const router = require('express').Router();

router.get('/', taskController.getTasks);
router.post('/', taskController.insertTask);
router.delete('/:id', taskController.deleteTask);
router.delete('/', taskController.deleteAll);

module.exports = router;
