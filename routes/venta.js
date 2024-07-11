const {Router} = require("express");
const { registrarTransaccion } = require("../controllers/venta");
const { validarJWT } = require("../middlewares/validarJWT");
const { check } = require("express-validator");
const { validar } = require("../middlewares/validarCampos");
const router = Router();

router.post('', [
    check("idFormaPago", "id debe ser un numero").isInt(),
    validar,
    validarJWT
],registrarTransaccion);

module.exports = router;