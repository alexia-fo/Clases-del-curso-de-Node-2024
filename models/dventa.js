const {  DataTypes } = require("sequelize");
const db = require("../db/connection");
const Producto = require("./Producto");

const DVenta = db.define('DVenta', {
    idcabecera:{ type: DataTypes.INTEGER, primaryKey:true },
    idproducto:{ type: DataTypes.INTEGER, primaryKey:true },
    // idproducto:{ type: DataTypes.INTEGER},
    cantidad:{ type: DataTypes.INTEGER, allowNull:false },
    total:{ type: DataTypes.INTEGER, allowNull:false },
},{
    tableName: 'dventa', 
    createdAt:false,
    updatedAt:false   
});

DVenta.belongsTo(Producto, {
    foreignKey: 'idproducto'
}); 

module.exports =DVenta;
