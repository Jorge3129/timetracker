const taskController = require("../controllers/taskController");
const router = require('express').Router();

router.get('/:userID/:date', taskController.getTasks);
router.post('/:userID', taskController.insertTask);
router.delete('/:userID/:date/:id', taskController.deleteTask);
router.delete('/:userID/:date/', taskController.deleteAll);
router.delete('/:userID', taskController.deleteAllDays);

module.exports = router;
