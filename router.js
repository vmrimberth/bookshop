const express = require('express');
const router = express.Router();

const conexion = require('./database/db');

//MOSTRAR todos los registros
router.get('/', (req, res)=>{
    conexion.query('SELECT id, titulo, precio, antiguedad FROM libro', (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('index', {results:results.rows});
        }
    });
    /*conexion.query('SELECT id, titulo, precio FROM libro', (error, results)=>{
        if(error){
            throw error;
        }else{
            res.send(results.rows);
        }
    });*/
});

//RUTA PARA CREAR REGISTROS
router.get('/create', (req, res)=>{
    res.render('create');
})

//RUTA PARA EDITAR REGISTROS
router.get('/edit/:id', (req, res)=>{
    const id = req.params.id
    conexion.query('SELECT id, titulo, precio, antiguedad FROM libro WHERE id=$1', [id], (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('edit', {libro:results.rows[0]});
        }
    })
});

//RUTA PARA ELIMINAR REGISTROS
router.get('/delete/:id', (req, res)=>{
    const id = req.params.id
    conexion.query('DELETE FROM libro WHERE id=$1', [id], (error, results)=>{
        if(error){
            throw error;
        }else{
            res.redirect('/');
        }
    })
});

//CALCULAR DESCUENTO
router.get('/descuento/:id', (req, res)=>{
    const id = req.params.id
    conexion.query('SELECT id, titulo, precio, antiguedad FROM libro WHERE id=$1', [id], (error, results)=>{
        if(error){
            throw error;
        }else{
            //res.render('edit', {libro:results.rows[0]});
            const libro = results.rows[0];
            const descuento = router.calcularDescuento(libro.antiguedad, libro.precio);
            console.log('El descuento es: '+router.decimalAdjust("round", descuento, -2));

            res.render('descuento', {descuento:router.decimalAdjust("round", descuento, -2)});
        }
    })
});

router.calcularDescuento = function(antiguedad, precio){
    if(antiguedad>0 && precio>0 && antiguedad!=null && precio!=null){
        var desc = 0;
        if (0<antiguedad && antiguedad<=2){
            desc = 0.1 * precio; 
        } else if (2<antiguedad && antiguedad<=5 ){ 
            desc = 0.2 * precio; 
        } else if ( 5<antiguedad && antiguedad<=8 ){
            desc = 0.3 * precio;
        } else if ( 8<antiguedad && antiguedad<=10 ){
            desc = 0.4 * precio;
        } else if ( 10<antiguedad ){
            desc = 0.5 * precio;
        } else{
            desc = 0;
        }
        return desc;
    }else{
        return 0;
    }
}

router.decimalAdjust = function(type, value, exp) {
    // Si el exp no está definido o es cero...
    if (typeof exp === "undefined" || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // Si el valor no es un número o el exp no es un entero...
    if (isNaN(value) || !(typeof exp === "number" && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split("e");
    value = Math[type](+(value[0] + "e" + (value[1] ? +value[1] - exp : -exp)));
    // Shift back
    value = value.toString().split("e");
    return +(value[0] + "e" + (value[1] ? +value[1] + exp : exp));
  }

const crud = require('./controllers/crud');
router.post('/save', crud.save);
router.post('/update', crud.update);

module.exports = router;