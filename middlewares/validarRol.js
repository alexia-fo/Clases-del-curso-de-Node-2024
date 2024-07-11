const Rol = require("../models/rol");

const esAdminRol = async (req, res, next)=>{
    if(!req.usuario){
        res.status(500).json({
            msg:'Se quiere validar el rol sin validar token'
        });
    }

    const {idrol, nombre} = req.usuario;

    const rol = await Rol.findByPk(idrol);

    console.log(rol.rol)
    if(rol.rol !== 'Administrador') {
        return res.status(401).json({
            msg: `${ nombre } no es administrador - No tiene los permisos`
        })
    }

    next();

}

module.exports = {
    esAdminRol
}