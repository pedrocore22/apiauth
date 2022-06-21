const express = require('express');
const app = express();
const connection = require('../db');
const {v4: uuidv4} = require('uuid');

// Post para registras nuevos usuarios

app.post('/', (req, resp) => {

    const query = `INSERT INTO usuarios (id, nombre, apellidos, email, password)
    VALUES ('${uuidv4().toString()}', '${req.body.nombre}', '${req.body.apellidos}', '${req.body.email}', '${req.body.password}')`;

    connection.query(query, (error, data) => {
        resp.status(200).json({
            message: 'ok'
        })
    })

})

module.exports = app;