const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors())

// Directorio Público
app.use( express.static('public') );

// Lectura y parseo del body
app.use( express.json() );

// Rutas
// app.use('/api/auth', require('./routes/auth') );
app.use('/api/notes', require('./routes/notes') );


const PORT = process.env.PORT || 4000;

// Escuchar peticiones
app.listen( PORT, () => {
    console.log(`Servidor corriendo en puerto ${ PORT }`);
});






