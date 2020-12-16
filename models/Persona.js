"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.personaSchema = void 0;
const mongoose_1 = require("mongoose");
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = require("jsonwebtoken");
var fonoSchema = new mongoose_1.Schema({
    fono_num: {
        type: String,
        required: true
    },
    fono_ope: {
        type: String,
        required: true
    }
});
var estudioSchema = new mongoose_1.Schema({
    est_nvl: {
        type: String,
        required: true
    },
    est_inst: {
        type: String,
        required: true
    },
    est_ini: {
        type: Date,
        required: true
    },
    est_fin: {
        type: Date,
        required: true
    }
});
var trabajoSchema = new mongoose_1.Schema({
    trab_emp: {
        type: String,
        required: true
    },
    trab_ini: {
        type: Date,
        required: true
    },
    trab_fin: {
        type: Date,
        required: true
    },
    trab_func: {
        type: String,
        required: true
    }
});
exports.personaSchema = new mongoose_1.Schema({
    per_nomb: {
        type: String,
        required: true
    },
    per_apel: {
        type: String,
        required: true
    },
    per_emal: {
        type: String,
        required: true
    },
    per_dni: {
        type: String,
    },
    per_fnac: {
        type: String,
    },
    per_dire: {
        type: String,
    },
    per_fonos: [
        fonoSchema
    ],
    per_estu: [
        estudioSchema
    ],
    per_trab: [
        trabajoSchema
    ],
    per_pref: [
        { per_puesto: String }
    ],
    per_salt: String,
    per_hash: String
}, {
    timestamps: true
});
exports.personaSchema.methods.cifrarContraseña = function (password) {
    this.per_salt = crypto_1.default.randomBytes(16).toString('hex');
    this.per_hash = crypto_1.default.pbkdf2Sync(password, this.per_salt, 1000, 64, 'sha512').toString('hex');
};
exports.personaSchema.methods.validarContraseña = function (password) {
    let temporal = crypto_1.default.pbkdf2Sync(password, this.per_salt, 1000, 64, 'sha512').toString('hex');
    if (temporal == this.per_hash) {
        return true;
    }
    else {
        return false;
    }
};
exports.personaSchema.methods.generarJWT = function () {
    let payload = {
        per_id: this._id,
        per_nomb: this.per_nomb,
        per_apel: this.per_apel,
    };
    let token = jsonwebtoken_1.sign(payload, 'proyecto', { expiresIn: 120 }, { algorithm: 'RS256' });
    return token;
};
