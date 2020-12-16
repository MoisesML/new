"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const persona_1 = require("../routes/persona");
const empresa_1 = require("../routes/empresa");
var cors = require('cors');
class Server {
    constructor() {
        this.app = express_1.default();
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            next();
        });
        this.app.use(cors());
        this.puerto = process.env.PUERTO || 5000;
        this.configurarBodyParser();
        this.conectarMongo();
        this.rutas();
    }
    configurarBodyParser() {
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        this.app.use(body_parser_1.default.json());
    }
    rutas() {
        this.app.get('/', (req, res) => {
            res.send('Bienvenido a la API-Proyecto');
        });
        this.app.use('', persona_1.persona_router, empresa_1.empresa_router);
    }
    iniciarServidor() {
        this.app.listen(this.puerto, () => {
            console.log('Servidor corriendo exitosamente en el puerto', this.puerto);
        });
    }
    conectarMongo() {
        mongoose_1.default.connect('mongodb+srv://Moises:moises@cluster0.fwbv5.mongodb.net/proyectocodigo?retryWrites=true&w=majority', { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true, useCreateIndex: true });
    }
}
exports.default = Server;
