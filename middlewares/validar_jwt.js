const jwt = require('jsonwebtoken');

const validarJWT = (req, resp, next)=>{
    //Leer el token
    const token = req.header('x-token');

    if(!token){
        return resp.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }

    try {
        const {uid} = jwt.verify(token, process.env.JWT_KEY);
        req.uid = uid;

        next();
    } catch (error) {
        return resp.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }

}

module.exports={
    validarJWT
};