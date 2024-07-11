const {  DataTypes } = require("sequelize");
const db = require("../db/connection");
const Usuario = require("./usuario");

const CVenta = db.define('CVenta', {
    id:{ type: DataTypes.INTEGER, primaryKey:true },
    idusuario:{ type: DataTypes.INTEGER},
    idFormaPago:{ type: DataTypes.INTEGER},
    total:{ type: DataTypes.INTEGER, allowNull:false },
},{
    createdAt: false,
    updatedAt: false,
    tableName: 'cventa'    
});

CVenta.belongsTo(Usuario, {
    foreignKey: 'idusuario'
}); 

module.exports = CVenta;
