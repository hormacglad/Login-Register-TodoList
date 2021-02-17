const express = require('express');
const app = express();
const user = require('./controller')

app.use(express.json());
app.use(user);


app.listen(4321, () => {
    console.log('server listening at port 4321.')
})

