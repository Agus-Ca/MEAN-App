const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt =  require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');



const crearUsuario = async ( req, res = response ) => {

    const { email, name, password } = req.body;

    try {
        // Verificar el email
        const usuario = await Usuario.findOne({ email });

        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario con ese mail ya existe'
            });
        }

        // Crear usuario con el modelo
        const dbUser = new Usuario( req.body );

        // Hashear la password
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync( password, salt );

        // Generar el JWT
        const token = await generarJWT(dbUser.id, dbUser.name);

        // Crear usuario de DB
        dbUser.save();

        // Generar respuesta exitosa
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            token
        })

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor, comuniquese con el administrador'
        })
    }
}

const loginUsuario = async ( req, res = response ) => {

    const { email, password } = req.body;

    try {
        const dbUser = await Usuario.findOne({ email });

        // Confirmar que el email exista
        if ( !dbUser ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo no existe'
            })
        }

        // Confirmar que el password hace match
        const validPassword = bcrypt.compareSync( password, dbUser.password );
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'El password no es válido'
            })
        }

        // Generar el JWT
        const token = await generarJWT(dbUser.id, dbUser.name);

        //Respuesta del servicio
        return res.json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            token
        });
    }
    catch ( error ) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor, comuniquese con el administrador'
        })
    }
}

const revalidarToken = async ( req, res = response ) => {

    const { uid } = req;

    // Leer la DB 
    const dbUser = await Usuario.findById( uid );

    // Generar el JWT
    const token = await generarJWT( dbUser.uid, dbUser.name );

    return res.json({
        ok: true,
        uid: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        token
    });
}



module.exports = {
    crearUsuario: crearUsuario,
    loginUsuario: loginUsuario,
    revalidarToken: revalidarToken
}