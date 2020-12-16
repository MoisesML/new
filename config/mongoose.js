"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Empresa = exports.Persona = void 0;
const mongoose_1 = require("mongoose");
const Persona_1 = require("../models/Persona");
const empresa_1 = require("../models/empresa");
exports.Persona = mongoose_1.model('persona', Persona_1.personaSchema);
exports.Empresa = mongoose_1.model('empresa', empresa_1.empresaSchema);
