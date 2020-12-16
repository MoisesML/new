"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.empresa_router = void 0;
const express_1 = require("express");
const empresa_1 = require("../controllers/empresa");
exports.empresa_router = express_1.Router();
exports.empresa_router.post('/empregistro', empresa_1.crearEmpresa);
exports.empresa_router.post('/emplogin', empresa_1.loginEmpresa);
exports.empresa_router.get('/empresas', empresa_1.devolverEmpresas);
