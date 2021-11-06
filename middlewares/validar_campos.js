const { response } = require("express");
const { validationResult } = require("express-validator");


const validarCampos = (req, resp, next)=>{//next le indica que si todo sale bien continue con el siguiente middleware

    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return resp.status(400).json({
            ok: false,
            errors: errores.mapped(),
        });
    }

    next();//lo muevo al siguiente middleware si pasa validaciones

}

module.exports = {
    validarCampos
}