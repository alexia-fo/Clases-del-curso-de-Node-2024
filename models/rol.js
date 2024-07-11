const {  DataTypes } = require("sequelize");
const db = require("../db/connection");

const Rol = db.define('Rol', {
    id:{ type: DataTypes.INTEGER, primaryKey:true },
    rol:{ type: DataTypes.STRING, allowNull:false },
},{
    createdAt: false,
    updatedAt: false,
    tableName: 'roles'    
});

module.exports = Rol;