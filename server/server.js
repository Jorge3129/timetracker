const express = require('express');
const app = express();
const cors = require('cors');
const dbController = require('./dbController')
const PORT = 8000;

app.use(cors())
app.use(express.json());

(async () => {
    await dbController.connectToDB();
    await dbController.createTable();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})();

app.get('/tasks', dbController.getTasks);
app.post('/tasks', dbController.insertTask);
app.delete('/tasks', dbController.deleteTask);

