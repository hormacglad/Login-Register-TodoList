const express = require('express');
const app = express();
const user = require('./controller/users_controller')
const todo = require('./controller/to-do-controller')

app.use(express.json());
app.use(user);
app.use(todo);


app.listen(4321, () => {
    console.log('server listening at port 4321.')
})

