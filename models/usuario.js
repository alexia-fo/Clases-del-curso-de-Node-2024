const {  DataTypes } = require("sequelize");
const db = require("../db/connection");
const Rol = require("./rol");

const Usuario = db.define('Usuario', {
    id:{ type: DataTypes.INTEGER, primaryKey:true },
    nombre:{ type: DataTypes.STRING, allowNull:false },
    correo:{ type: DataTypes.STRING, allowNull:false },
    contra:{ type: DataTypes.STRING, allowNull:false },
    idrol:{ type: DataTypes.INTEGER, allowNull:false },
    estado:{ type: DataTypes.BOOLEAN, allowNull:false, defaultValue:true }
},{
    createdAt: true,
    updatedAt: true,
    tableName: 'usuarios'    
});

Usuario.belongsTo(Rol, {
    foreignKey: 'idrol'
});    

module.exports = Usuario;
