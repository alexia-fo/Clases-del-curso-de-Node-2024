const express = require('express');
const cors = require('cors');
const db = require('../db/connection');

const path =require('path');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersR = '/api/usuarios';
        this.autentificacionR = '/api/auth';
        this.ventaR = '/api/venta';
        this.roles = '/api/roles';
        this.dbConnection();
        this.middleware();

        this.routes();

        //FIXME: Todavia no mostre
        this.templates();
       
    }

    async dbConnection() {
        try {
            await db.authenticate();
            console.log("Base de Datos en linea");
        } catch (error) {
            throw new Error(error);
        }
    }

    middleware(){
        this.app.use( cors() );
        this.app.use( express.json() );
    }
       
    routes() {
        this.app.use(this.usersR, require('./../routes/users'));
        this.app.use(this.autentificacionR, require('./../routes/auth'));
        this.app.use(this.ventaR, require('./../routes/venta'));
        this.app.use(this.roles, require('./../routes/roles'));
    }

    templates(){
        // Servir archivos estáticos desde la carpeta 'public'
        this.app.use(express.static(path.join(__dirname, '../public')));

        // Manejar todas las rutas y devolver el archivo 'index.html' para rutas desconocidas
        this.app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../public', 'index.html'));
        });
    }

    listen() {
        this.app.listen(this.port, () => { console.log(`Escuchando en: ${this.port}`); });
    }
}
module.exports = Server;
