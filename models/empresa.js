"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.empresaSchema = void 0;
const mongoose_1 = require("mongoose");
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = require("jsonwebtoken");
exports.empresaSchema = new mongoose_1.Schema({
    emp_nomb: {
        type: String,
        required: true
    },
    emp_rsoc: {
        type: String,
    },
    emp_ruc: {
        type: String,
        required: true
    },
    emp_dire: {
        type: String,
    },
    emp_emal: {
        type: String,
        required: true
    },
    // Falta agragar los favroitos de cada empresa
    emp_salt: String,
    emp_hash: String
}, {
    timestamps: true
});
exports.empresaSchema.methods.cifrarContraseña = function (password) {
    this.emp_salt = crypto_1.default.randomBytes(16).toString('hex');
    this.emp_hash = crypto_1.default.pbkdf2Sync(password, this.emp_salt, 1000, 64, 'sha512').toString('hex');
};
exports.empresaSchema.methods.validarContraseña = function (password) {
    let temporal = crypto_1.default.pbkdf2Sync(password, this.emp_salt, 1000, 64, 'sha512').toString('hex');
    if (temporal == this.emp_hash) {
        return true;
    }
    else {
        return false;
    }
};
exports.empresaSchema.methods.generarJWT = function () {
    let payload = {
        emp_id: this._id,
        emp_nomb: this.emp_nomb,
        emp_ruc: this.emp_ruc,
    };
    let token = jsonwebtoken_1.sign(payload, 'proyecto', { expiresIn: 120 }, { algorithm: 'RS256' });
    return token;
};
