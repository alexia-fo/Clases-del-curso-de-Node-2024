const Producto = require("../models/Producto");
const CVenta = require("../models/cventa");
const sequelize = require('../db/connection');
const DVenta = require("../models/dventa");

const registrarTransaccion = async (req, res) => {
    const { idFormaPago, productos} = req.body; 
    const idusuario=req.usuario.id;
    console.log(idusuario)
    let t; //para generar la transaccion
    let total=0;
    try {
            //COMIENZA LA TRANSACCION
            t = await sequelize.transaction();

            console.log(productos)
            for (const producto of productos) {
                const { idproducto, cantidad } = producto;
            
                // Buscar el producto por su ID
                const prod = await Producto.findByPk(idproducto);
            
                if (!prod) {
                    throw new Error(`El producto con ID ${idproducto} no existe`);
                }
            
                // Calcular el total para este producto
                const totalProducto = cantidad * prod.precio;
                total += totalProducto;
            }

            const cab ={
                idFormaPago,
                idusuario,
                total
            }

            //insertamos la cabecera de la recepcion
            await CVenta.create(cab, { transaction: t });
                        
            const result = await sequelize.query('SELECT LAST_INSERT_ID() as lastId', {
                type: sequelize.QueryTypes.SELECT,
                transaction:t
            });
              
            const idCabecera = result[0].lastId;

            //todo: inicio

            for (const producto of productos) {
                const { idproducto, cantidad } = producto;
            
                // Buscar el producto por su ID
                const prod = await Producto.findByPk(idproducto);
            
                if (!prod) {
                    throw new Error(`El producto con ID ${idproducto} no existe`);
                }
            
                const totalProducto = cantidad * prod.precio;
            
                // Insertar el detalle de la venta
                await DVenta.create({
                    idcabecera: idCabecera,
                    idproducto: idproducto,
                    cantidad: cantidad,
                    total: totalProducto,
                }, { transaction: t });
            }

            //todo: fin
        
            await t.commit();

            res.status(201).json({msg:"Venta registrada correctamente"});

     
    } catch (error) {
        if (t) await t.rollback(); // Verificar que t esté definido antes de llamar a rollback()
        res.status(500).json({msg:'Error al realizar la transacción'});   
    }
}

module.exports={
    registrarTransaccion
}