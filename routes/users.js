const express = require('express');
const app = express();
const connection = require('../db');
const {v4: uuidv4} = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Post para registrar nuevos usuarios

app.post('/', (req, resp) => {
    const password = bcrypt.hashSync(req.body.password, 10);
    const query = `INSERT INTO usuarios (id, nombre, apellidos, email, password)
    VALUES ('${uuidv4().toString()}', '${req.body.nombre}', '${req.body.apellidos}', '${req.body.email}', '${password}')`;

    connection.query(query, (error, data) => {

        if(error?.errno === 1062) {
            return resp.status(400).json({
                message: 'El email ya existe'
            })
        }

        resp.status(200).json({
            message: 'ok'
        })
    })

})

// Post para login de usuarios

app.post('/login', (req, resp) => {
    const query = `SELECT * FROM usuarios WHERE email = '${req.body.email}'`;
    connection.query(query, (err, data) => {
        if (data.length === 0) {
            return resp.status(400).json({
                message: 'El email no existe'
            })
        }
        if(!bcrypt.compareSync(req.body.password, data[0].password)) {
            return resp.status(403).json({
                message: 'El email o contraseña son incorrectos'
            })
        }
        if(err) {
            return resp.status(500).json({
                message: 'El servidor no se encuentra disponible en estos momentos'
            })
        }
        const token = jwt.sign({
            user: {
                id: data[0].id,
                nombre: data[0].nombre,
                apellidos: data[0].apellidos,
                email: data[0].email
            }
        }, 'ffgfhddffsd', {expiresIn: 60}); // expiresIn (segundos)
        resp.cookie('token', token, {httpOnly: true, secure: true, sameSite: 'none', maxAge: 60 * 1000});
        resp.status(200).json({
            mesage: 'ok'
        })
    })
})

module.exports = app;