"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.devolverPersona = exports.devolverPersonas = exports.loginPersona = exports.crearPersona = void 0;
const mongoose_1 = require("../config/mongoose");
var crearPersona = (req, res) => {
    let objPersona = new mongoose_1.Persona(req.body);
    objPersona.cifrarContraseña(req.body.password);
    objPersona.save((error, nuevaPersona) => {
        if (error) {
            res.status(500).json({
                ok: false,
                content: error,
                message: 'Hubo un error al registrar a la persona'
            });
        }
        else {
            res.status(201).json({
                ok: true,
                content: nuevaPersona,
                message: 'Persona registrada exitosamente'
            });
        }
    });
};
exports.crearPersona = crearPersona;
var loginPersona = (req, res) => {
    let { email, password } = req.body;
    mongoose_1.Persona.findOne({ per_emal: email }, (error, persona) => {
        if (persona) {
            let validacion = persona.validarContraseña(password);
            if (validacion) {
                res.json({
                    ok: true,
                    content: persona._id,
                    message: 'Bienvenido'
                });
            }
            else {
                res.json({
                    ok: false,
                    content: null,
                    message: 'Contraseña incorrecta'
                });
            }
        }
        else {
            res.status(404).json({
                ok: false,
                content: null,
                message: 'Usuario inexistente'
            });
        }
    });
};
exports.loginPersona = loginPersona;
var devolverPersonas = (req, res) => {
    mongoose_1.Persona.find((error, personas) => {
        if (error) {
            res.status(500).json({
                ok: false,
                content: error,
                message: 'Hubo un error al traer los usuarios'
            });
        }
        else {
            res.json({
                ok: true,
                content: personas,
                message: null
            });
        }
    });
};
exports.devolverPersonas = devolverPersonas;
var devolverPersona = (req, res) => {
    let { id } = req.params;
    mongoose_1.Persona.findById(id, (error, persona) => {
        if (persona) {
            res.json({
                ok: true,
                content: persona,
                message: 'Se encontro la persona'
            });
        }
        else {
            res.json({
                ok: false,
                content: null,
                message: 'No se encontro la persona'
            });
        }
    });
};
exports.devolverPersona = devolverPersona;
