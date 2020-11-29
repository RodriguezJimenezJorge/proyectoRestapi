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
exports.alumnoRoutes = void 0;
const express_1 = require("express");
const alumno_1 = require("../model/alumno");
const database_1 = require("../database/database");
class AlumnoRoutes {
    constructor() {
        this.getAlumnos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                console.log(mensaje);
                const query = yield alumno_1.Alumnos.find();
                console.log(query);
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
                console.log(mensaje);
            });
            database_1.db.desconectarBD();
        });
        this.nuevoAlumnoPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            // Observar la diferencia entre req.body (para POST) 
            // y req.params (para GET con los parámetros en la URL
            const { nombre, nota1, nota2, nota3, edad } = req.body;
            console.log(nombre);
            const dSchema = {
                _nombre: nombre,
                _nota1: parseInt(nota1),
                _nota2: parseInt(nota2),
                _ntoa3: parseInt(nota3),
                _edad: parseInt(edad)
            };
            console.log(dSchema);
            const oSchema = new alumno_1.Alumnos(dSchema);
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
            // concatenando con cadena muestra sólo el mensaje
            yield database_1.db.desconectarBD();
        });
        this.nuevoAlumnoGet = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { nombre, nota1, nota2, nota3, edad } = req.params;
            console.log(req.params);
            yield database_1.db.conectarBD();
            const dSchema = {
                _nombre: nombre,
                _nota1: parseInt(nota1),
                _nota2: parseInt(nota2),
                _nota3: parseInt(nota3),
                _edad: parseInt(edad)
            };
            const oSchema = new alumno_1.Alumnos(dSchema);
            yield oSchema.save()
                .then((doc) => {
                console.log('Salvado Correctamente: ' + doc);
                res.json(doc);
            })
                .catch((err) => {
                console.log('Error: ' + err);
                res.send('Error: ' + err);
            });
            // concatenando con cadena muestra sólo el mensaje
            yield database_1.db.desconectarBD();
        });
        this.getArea = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let triangulo;
            let sup = 0;
            const { nombre } = req.params;
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                console.log(mensaje);
                yield Triangulos.findOne({ _nombre: { $eq: nombre } }, (error, doc) => {
                    if (error) {
                        console.log(error);
                        res.json({ "error": "mensaje: " + error });
                    }
                    else {
                        if (doc == null) {
                            console.log('No existe');
                            res.json({});
                        }
                        else {
                            console.log('Existe: ' + doc);
                            triangulo =
                                new Triangulo(doc._nombre, doc._base, doc._lado2, doc._lado3);
                            triangulo.altura = doc._altura;
                            sup = triangulo.area();
                            res.json({ "nombre": nombre, "area": sup });
                        }
                    }
                });
            }))
                .catch((mensaje) => {
                res.send(mensaje);
                console.log(mensaje);
            });
            database_1.db.desconectarBD();
        });
        this.getAreav2 = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { nombre } = req.params;
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                console.log(mensaje);
                const query = yield Triangulos.findOne({ _nombre: nombre });
                if (query == null) {
                    console.log(query);
                    res.json({});
                }
                else {
                    const triangulo = new Triangulo(query._nombre, query._base, query._lado2, query._lado3);
                    triangulo.altura = query._altura;
                    console.log(triangulo);
                    res.json({ "nombre": triangulo.nombre, "area": triangulo.area() });
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
            yield Triangulos.findOneAndDelete({ _nombre: nombre }, (err, doc) => {
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
        this.getAreas = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let arrayT = new Array();
            yield database_1.db.conectarBD();
            let tmpTriangulo;
            let dTriangulo;
            const query = yield Triangulos.find({});
            for (dTriangulo of query) {
                tmpTriangulo =
                    new Triangulo(dTriangulo._nombre, dTriangulo._base, dTriangulo._lado2, dTriangulo._lado3);
                tmpTriangulo.altura = dTriangulo._altura;
                const doc = {
                    nombre: dTriangulo._nombre,
                    area: tmpTriangulo.area()
                };
                arrayT.push(doc);
                console.log(`Triángulo ${tmpTriangulo.nombre} Área: ${tmpTriangulo.area()}`);
            }
            console.log(arrayT);
            res.json(arrayT);
            yield database_1.db.desconectarBD();
        });
        this.actualiza = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { nombre } = req.params;
            const { base, altura, lado2, lado3 } = req.body;
            yield database_1.db.conectarBD();
            yield Triangulos.findOneAndUpdate({ _nombre: nombre }, {
                _nombre: nombre,
                _base: base,
                _lado2: lado2,
                _lado3: lado3,
                _altura: altura
            }, {
                new: true,
                runValidators: true // para que se ejecuten las validaciones del Schema
            })
                .then((docu) => {
                if (docu == null) {
                    console.log('El triangulo que desea modificar no existe');
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
            }); // concatenando con cadena muestra mensaje
            database_1.db.desconectarBD();
        });
        this._router = express_1.Router();
    }
    get router() {
        return this._router;
    }
    misRutas() {
        this._router.get('/', this.getTriangulos);
        this._router.get('/nuevoG/:nombre&:base&:altura&:lado1&:lado2', this.nuevoTrianguloGet);
        this._router.post('/nuevoP', this.nuevoTrianguloPost);
        this._router.get('/area/:nombre', this.getArea);
        this._router.get('/areav2/:nombre', this.getAreav2);
        this._router.get('/borrar/:nombre', this.getDelete);
        this._router.get('/areas', this.getAreas);
        this._router.post('/actualiza/:nombre', this.actualiza);
    }
}
const obj = new AlumnoRoutes();
obj.misRutas();
exports.alumnoRoutes = obj.router;
