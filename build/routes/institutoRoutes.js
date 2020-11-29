"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.institutoRoutes = void 0;
const express_1 = require("express");
const Instituto_1 = require("../model/Instituto");
const database_1 = require("../database/database");
class InstitutoRoutes {
    constructor() {
        this.getInstitutos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                console.log(mensaje);
                const query = yield Instituto_1.Institutos.find();
                console.log(query);
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
                console.log(mensaje);
            });
            database_1.db.desconectarBD();
        });
        this.nuevoInstitutoPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const { nombre, nAulas, nProfesores, nAlumnos, nCiclos } = req.body;
            console.log(nombre);
            const dSchema = {
                _nombre: nombre,
                _nAulas: parseInt(nAulas),
                _nProfesores: parseInt(nProfesores),
                _nAlumnos: parseInt(nAlumnos),
                _nCiclos: parseInt(nCiclos)
            };
            console.log(dSchema);
            const oSchema = new Instituto_1.Institutos(dSchema);
            yield database_1.db.conectarBD();
            yield oSchema.save()
                .then((doc) => {
                console.log('Salvado Correctamente: ' + doc);
                res.json(doc);
            })
                .catch((err) => {
                console.log('Error: ' + err);
                res.send('Error: ' + err);
            });
            yield database_1.db.desconectarBD();
        });
        this.getTotalPersonas = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { nombre } = req.params;
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                console.log(mensaje);
                const query = yield Instituto_1.Institutos.findOne({ _nombre: nombre });
                if (query == null) {
                    console.log(query);
                    res.json({});
                }
                else {
                    const instituto = new Instituto_1.Instituto(query._nombre, query._nAulas, query._nProfesores, query._nAlumnos, query._nCiclos);
                    console.log(instituto);
                    res.json({ "nombre": instituto.nombre, "totalpersonas": instituto.totalpersonas() });
                }
            }))
                .catch((mensaje) => {
                res.send(mensaje);
                console.log(mensaje);
            });
            database_1.db.desconectarBD();
        });
        this.getDelete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { nombre } = req.params;
            yield database_1.db.conectarBD();
            yield Instituto_1.Institutos.findOneAndDelete({ _nombre: nombre }, (err, doc) => {
                if (err)
                    console.log(err);
                else {
                    if (doc == null) {
                        console.log(`No encontrado`);
                        res.send(`No encontrado`);
                    }
                    else {
                        console.log('Borrado correcto: ' + doc);
                        res.send('Borrado correcto: ' + doc);
                    }
                }
            });
            database_1.db.desconectarBD();
        });
        this.actualiza = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { nombre } = req.params;
            const { nAulas, nProfesores, nAlumnos, nCiclos } = req.body;
            yield database_1.db.conectarBD();
            yield Instituto_1.Institutos.findOneAndUpdate({ _nombre: nombre }, {
                _nombre: nombre,
                _nAulas: nAulas,
                _nProfesores: nProfesores,
                _nAlumnos: nAlumnos,
                _nCiclos: nCiclos
            }, {
                new: true,
                runValidators: true // para que se ejecuten las validaciones del Schema
            })
                .then((docu) => {
                if (docu == null) {
                    console.log('El instituto que desea modificar no existe');
                    res.json({ "Error": "No existe: " + nombre });
                }
                else {
                    console.log('Modificado Correctamente: ' + docu);
                    res.json(docu);
                }
            })
                .catch((err) => {
                console.log('Error: ' + err);
                res.json({ error: 'Error: ' + err });
            });
            database_1.db.desconectarBD();
        });
        this._router = express_1.Router();
    }
    get router() {
        return this._router;
    }
    misRutas() {
        this._router.get('/', this.getInstitutos);
        this._router.post('/nuevoI', this.nuevoInstitutoPost);
        this._router.get('/areav2/:nombre', this.getTotalPersonas);
        this._router.get('/borrar/:nombre', this.getDelete);
        this._router.post('/actualiza/:nombre', this.actualiza);
    }
}
const obj = new InstitutoRoutes();
obj.misRutas();
exports.institutoRoutes = obj.router;
