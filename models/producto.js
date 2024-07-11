const {  DataTypes } = require("sequelize");
const db = require("../db/connection");

const Producto = db.define('Producto', {
    id:{ type: DataTypes.INTEGER, primaryKey:true },
    nombre:{ type: DataTypes.STRING, allowNull:false },
    precio:{ type: DataTypes.INTEGER, allowNull:false },
    // descripcion:{ type: DataTypes.STRING, allowNull:false },
    // idclasificacion:{ type: DataTypes.INTEGER, allowNull:false },
    // estado:{ type: DataTypes.BOOLEAN, allowNull:false }
},{
    createdAt: true,
    updatedAt: true,
    tableName: 'productos'    
});

// Producto.belongsTo(Clasificacion, {
//     foreignKey: 'idclasificacion'
// });    

module.exports = Producto;
