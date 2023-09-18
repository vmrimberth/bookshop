const conexion = require("../database/db");

exports.save = (req, res)=>{
    const titulo = req.body.titulo;
    const precio = req.body.precio;
    const antiguedad = req.body.antiguedad;
    //console.log(titulo+' - '+precio);
    conexion.query('INSERT INTO libro (titulo, precio, antiguedad) values($1, $2, $3)', [titulo, precio, antiguedad], (error, results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('/');
        }
    })
} 

exports.update = (req, res)=>{
    const id = req.body.id;
    const titulo = req.body.titulo;
    const precio = req.body.precio;
    const antiguedad = req.body.antiguedad;
    conexion.query('UPDATE libro SET titulo = $1, precio = $2, antiguedad=$3 WHERE id = $4', [titulo, precio, antiguedad, id], (error, results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('/');
        }
    })
} 