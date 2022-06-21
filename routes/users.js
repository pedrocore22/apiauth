const express = require('express');
const app = express();
const connection = require('../db');
const {v4: uuidv4} = require('uuid');
const bcrypt = require('bcrypt');

// Post para registras nuevos usuarios

app.post('/', (req, resp) => {
    const password = bcrypt.hashSync(req.body.password, 10);
    const query = `INSERT INTO usuarios (id, nombre, apellidos, email, password)
    VALUES ('${uuidv4().toString()}', '${req.body.nombre}', '${req.body.apellidos}', '${req.body.email}', '${password}')`;

    connection.query(query, (error, data) => {

        if(error?.errno === 1062) {
            console.log(error);
            return resp.status(400).json({
                message: 'El email ya existe'
            })
        }

        resp.status(200).json({
            message: 'ok'
        })
    })

})

module.exports = app;