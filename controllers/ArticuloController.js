const { query } = require("express");
const models = require("../models");

module.exports = {

    add: async(req, res, nex) => {
        try {
            const reg = await models.Articulo.create(req.body);
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(error);
        }
    },

    query: async(req, res, next) => {
        try {
            const reg = await models.Articulo.findOne({ where: { id: req.query.codigo } });

            if (!reg) {
                res.status(404).send({
                    message: 'El registro no existe'
                });

            } else {
                res.status(200).json(reg);
            }
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(error);
        }
    },
    list: async(req, res, next) => {
        try {
            const reg = await models.Articulo.findAll();
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurio un error'
            });
            next(error);

        }
    },
    remove: async(req, res, next) => {
        try {
            const reg = await models.Articulo.destroy({ where: { id: req.body.id } });
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(error);
        }
    },

    update: async(req, res, next) => {
        try {
            const reg = await models.Articulo.update({
                nombre: req.body.nombre,
                descripcion: req.body.descripcion
            }, { where: { id: req.body.id } });
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(error);
        }
    },
    activate: async(req, res, next) => {
        try {

            const reg = await models.Articulo.update({ estado: 1 }, { where: { id: req.body.id } });
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(error);
        }
    },
    deactivate: async(req, res, next) => {
        try {


            const reg = await models.Articulo.update({ estado: 0 }, { where: { id: req.body.id } });
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(error);
        }
    }



}