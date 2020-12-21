const models = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const servicesToken = require('../services/token.js')




module.exports = {

    login: async(req, res, next) => {
        try {
            const usuario = await models.Usuario.findOne({ where: { email: req.body.email } })

            if (usuario) {
                const passwordIsValid = bcrypt.compareSync(req.body.password, usuario.password);
                if (passwordIsValid) {

                    let token = await servicesToken.encode(usuario.id, usuario.rol);

                    res.status(200).send({
                        auth: true,
                        tokenReturn: token,
                        usuario: usuario
                    });


                } else {

                    res.status(401).send('Usuario o contraseña incorrectos');

                }

            } else {

                res.status(404).send('Usuario o contraseña incorrectos');


            }

        } catch (error) {
            res.status(500).send({
                message: 'No se puede logar->'
            });
            next(error);
        }
    },

    add: async(req, res, next) => {
        try {

            const usuario = await models.Usuario.findOne({
                where: {
                    email: req.body.email
                }
            });

            if (usuario) {
                res.status(409).send({
                    message: 'El email ya existe'
                });
            } else {
                req.body.password = bcrypt.hashSync(req.body.password, 10);
                const user = await models.Usuario.create(req.body);
                res.status(200).json(user);
            }


        } catch (error) {
            res.status(500).send({
                message: ' Error->'
            });

            next(error);
        }
    },


    list: async(req, res, next) => {

        try {

            const usuario = await models.Usuario.findAll();

            if (usuario) {

                res.status(200).json(usuario);

            } else {
                res.status(404).send({
                    message: 'Ususario no encontrado'
                });

            }


        } catch (error) {
            res.status(500).send({
                message: 'Error->'
            });
            next(error);
        }

    },

    update: async(req, res, next) => {

        try {

            const usuario = await models.Usuario.findOne({ where: { id: req.body.id } });

            if (usuario) {

                const user = await models.Usuario.update({
                    nombre: req.body.nombre,
                    rol: req.body.rol,
                    password: req.body.password,
                    email: req.body.email

                }, {
                    where: {
                        email: req.body.id
                    }
                });
                res.status(200).json(user);

            } else {

                res.status(404).send({
                    message: 'Usuario no econtrado'
                });

            }

        } catch (error) {
            res.status(500).send({
                message: 'Error->'
            });
            next(error)
        }


    },
    activate: async(req, res, next) => {
        try {


            const usuario = await models.Usuario.update({ estado: 1 }, { where: { id: req.body.id } });
            res.status(200).json(usuario);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(error);
        }
    },
    deactivate: async(req, res, next) => {
        try {


            const usuario = await models.Usuario.update({ estado: 0 }, { where: { id: req.body.id } });
            res.status(200).json(usuario);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(error);
        }
    }
}