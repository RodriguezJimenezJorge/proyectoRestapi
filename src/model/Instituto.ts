import {Schema, model } from 'mongoose'

export class Instituto{
    private "_nombre": string
    private _nAulas: number
    private _nProfesores: number
    private _nAlumnos: number
    private "_nCiclos": number

    constructor(_nombre: string, _nAulas : number, _nProfesores : number, _nAlumnos : number, _nCiclos : number
        ){
        this._nombre = _nombre
        this._nAulas = _nAulas
        this._nProfesores = _nProfesores
        this._nAlumnos = _nAlumnos
    }

    get nombre(){
        return this._nombre
    }

    get nAulas(){
        return this._nAulas
    }

    get nProfesores(){
        return this._nProfesores
    }

    get nAlumnos(){
        return this._nAlumnos
    }

    get nCiclos(){
        return this._nCiclos
    }

    set nCiclos(_nCiclos: number){
        /*
            Si el centro tiene menos de 5 ciclos
            levantamos una excepción con throw y su mensaje
            En otro caso asignamos el número de ciclos al centro
        */
        if (_nCiclos < 5){
            throw "Número de ciclos incorrecto, no puede haber menos de 5"
        }
        this._nCiclos = _nCiclos
    }
   
    totalpersonas(){
        // Este método calcular el número total de personas del instituto
        let totalpersonas: number
        totalpersonas = this._nProfesores+this._nAlumnos
        if (totalpersonas < 1){
            throw "No hay nadie en el instituto"
        }
        return totalpersonas
    }

    alumporprofesor(){
        // Proporción de alumnos por cada profesor
        let alumporprofesor: number
        alumporprofesor = Math.trunc(this._nAlumnos/this._nProfesores)
        if (alumporprofesor <= 5){
            throw "No puede haber menos de 5 alumnos por profesor"
        }
        return alumporprofesor
    }

    profesporciclo(){
        // Proporción de profesores por cada ciclo
        let profesporciclo: number
        profesporciclo = Math.trunc(this._nProfesores/this._nCiclos)
        if (profesporciclo < 1){
            throw "No puede haber menos de 1 profesor por cada ciclo"
        }
        return profesporciclo
    }

    aulasusadas(){
        let aulasusadas: number                         // Suponemos que caben 20 alumnos en cada clase y calculamos
        aulasusadas = Math.trunc(this._nAlumnos/20)     // el número de aulas en uso con los alumnos que hay
        if (aulasusadas > this._nAulas){
            throw "No se pueden usar más aulas de las que hay"
        }
        return aulasusadas
    }

}

// Definimos el type

export type tInstituto = {
    _nombre: string,
    _nAulas: number,
    _nProfesores: number,
    _nAlumnos: number,
    _nCiclos: number
}

// Definimos el Schema
const institutoSchema = new Schema({
    _nombre: {
        type: String,
        unique: true
    },
    _nAulas: Number,
    _nProfesores: {
        type: Number,
        min: 5,
        max: 100
    },
    _nAlumnos: {
        type: Number,
        min: 100,
    },
    _nCiclos: {
        type: Number,
        max: 30
    }
})

// La colección de la BD: institutos
export const Institutos = model('institutos', institutoSchema)
