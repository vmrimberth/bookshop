const { Client } = require('pg');

const connectionData = {
    user: 'postgres',
    host: 'localhost',
    database: 'biblioteca',
    password: 'saori.1222',
    port: 5432,
  };

  const conexion = new Client(connectionData);

  conexion.connect((error)=>{
    if(error){
        console.error('El error de conexion es: ' + error);
        return;
    }
  });

  module.exports = conexion;