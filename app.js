const express = require('express');
const app = express();


app.get('/', (req, resp) => {
    resp.json({
        message: 'Hola Universo!'
    })
})


app.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
})