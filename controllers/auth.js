const { response } = require("express");
const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async (req, resp=response)=>{    

    const  {email, password} = req.body;//extraemos el email, password

    try {
        const existeEmail = await Usuario.findOne({email});

        if(existeEmail){
            return resp.status(400).json({
                ok:false,
                msg: 'El correo ya existe en la base de Datos',
            });
        }

        const usuario = new Usuario(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();//salt es utilizado para generar numeros diferentes
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();


        //Generar JSON Web Tocken JWT
        const token = await generarJWT(usuario.id);

        resp.json({
            ok:true,
            usuario,
            token,
        });
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error. Hable con el Administrador'
        });
    }
}

const login = async (req, resp=response)=>{
    const {email, password} = req.body;

    try {
        //validamos usuario/email
        const usuarioDB = await Usuario.findOne({email});
        if(!usuarioDB){
            return resp.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        //validamos password
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if(!validPassword){            
            return resp.status(400).json({
                ok: false,
                msg: 'La contraseña no es válida'
            });
        }

        //generar el JWT
        const token = await generarJWT(usuarioDB.id);

        return resp.json({
            ok: true,
            usuario: usuarioDB,
            token,
        });

    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const renewToken = async (req, resp=response)=>{

    const uid = req.uid;

    const token = await generarJWT(uid);

    const usuario = await Usuario.findById(uid);
    
    resp.json({
        ok: true,
        usuario,
        token,
    });
}


module.exports = {
    crearUsuario,
    login,
    renewToken
}

