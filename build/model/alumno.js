"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Alumnos = exports.Alumno = void 0;
const mongoose_1 = require("mongoose");
class Alumno {
    constructor(_nombre, _nota1, _nota2, _nota3, _edad) {
        this._nombre = _nombre;
        this._nota1 = _nota1;
        this._nota2 = _nota2;
        this._nota3 = _nota3;
        //    this._edad = edad
    }
    get nombre() {
        return this._nombre;
    }
    get nota1() {
        return this._nota1;
    }
    get nota2() {
        return this._nota2;
    }
    get nota3() {
        return this._nota3;
    }
    get edad() {
        return this._edad;
    }
    set edad(_edad) {
        /*
            Si el alumno es menor de edad
            levantamos una excepción con throw y su mensaje
            En otro caso asignamos la edad al alumno
        */
        if (_edad < 18) {
            throw "Edad incorrecta, el alumno no puede ser menor de edad";
        }
        this._edad = _edad;
    }
    /*
    Si el método no puede hacer su trabajo levanta una excepción con throw
    y se interrumpe su ejecución en ese punto
    */
    notaMedia() {
        let notaMedia;
        notaMedia = (this._nota1 + this._nota2 + this._nota3) / 3;
        if (notaMedia == 0) {
            throw "Alumno no introducido";
        }
        return notaMedia;
    }
    area() {
        if (isNaN(this._altura)) {
            throw "Altura no asignada";
        }
        return (this._base * this._altura) / 2;
    }
}
exports.Alumno = Alumno;
// Definimos el Schema
const alumnoSchema = new mongoose_1.Schema({
    _nombre: {
        type: String,
        unique: true // useCreateIndex: true en la conexión para que se cree el índice único
    },
    _nota1: {
        type: Number,
        min: 0,
        max: 10
    },
    _nota2: {
        type: Number,
        min: 0,
        max: 10
    },
    _nota3: {
        type: Number,
        min: 0,
        max: 10
    },
    _edad: {
        type: Number,
        max: 65
    }
});
// La colección de la BD: alumnos
exports.Alumnos = mongoose_1.model('alumnos', alumnoSchema);
