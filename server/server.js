const express = require('express');
const app = express();
const cors = require('cors');
const cookie = require('cookie-parser')
const session = require('express-session')
const dbController = require('./dbController');
const taskRouter = require('./routes/taskRouter');
const authRouter = require('./routes/authRouter')
const PORT = 8000;

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

app.use(cookie());
app.use(express.json());

(async () => {
    await dbController.connectToDB();
    await dbController.createUserTable();
    await dbController.createTaskTable();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})();

app.use('/tasks', taskRouter);
app.use('/auth', authRouter);


