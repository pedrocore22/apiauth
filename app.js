const express = require('express');
const app = express();

const users = require('./routes/users');
app.use(express.json()); // Parsea los JSON entrantes a JavaScript;
app.use('/users', users);

app.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
})