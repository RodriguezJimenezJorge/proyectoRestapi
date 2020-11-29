import {Request, Response, Router } from 'express'
import { Institutos, Instituto, tInstituto } from '../model/Instituto'
import { db } from '../database/database'

class InstitutoRoutes {
    private _router: Router

    constructor() {
        this._router = Router()
    }
    get router(){
        return this._router
    }

    private getInstitutos = async (req: Request, res: Response) => {
        await db.conectarBD()
        .then( async (mensaje) => {
            console.log(mensaje)
            const query = await Institutos.find()
            console.log(query)
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
            console.log(mensaje)
        })

        db.desconectarBD()
    }
  

    private nuevoInstitutoPost = async (req: Request, res: Response) => {
        console.log(req.body)
        const { nombre, nAulas, nProfesores, nAlumnos, nCiclos } = req.body

        console.log(nombre)

        const dSchema = {
            _nombre: nombre,
            _nAulas: parseInt(nAulas),
            _nProfesores: parseInt(nProfesores),
            _nAlumnos: parseInt(nAlumnos),
            _nCiclos: parseInt(nCiclos)   
        }
        console.log(dSchema)
        const oSchema = new Institutos(dSchema)
        await db.conectarBD()
        await oSchema.save()
        .then( (doc) => {
            console.log('Salvado Correctamente: '+ doc)
            res.json(doc)
        })
        .catch( (err: any) => {
            console.log('Error: '+ err)
            res.send('Error: '+ err)
        })

        await db.desconectarBD()
    }     

    private getTotalPersonas = async (req: Request, res: Response) => {
        const { nombre } = req.params
        await db.conectarBD()
        .then( async (mensaje) => {
            console.log(mensaje)
            const query: any = await Institutos.findOne({_nombre: nombre})
            if (query == null){
                console.log(query)
                res.json({})
            }else{
                const instituto = new Instituto(query._nombre, query._nAulas, query._nProfesores, 
                    query._nAlumnos, query._nCiclos)
                console.log(instituto)
                res.json({"nombre": instituto.nombre, "Total de personas: ": instituto.totalpersonas()})
            }
        })
        .catch((mensaje) => {
            res.send(mensaje)
            console.log(mensaje)
        })
        db.desconectarBD()
    }

    private getAlumnosPorProfesor = async (req: Request, res: Response) => {
        const { nombre } = req.params
        await db.conectarBD()
        .then( async (mensaje) => {
            console.log(mensaje)
            const query: any = await Institutos.findOne({_nombre: nombre})
            if (query == null){
                console.log(query)
                res.json({})
            }else{
                const instituto = new Instituto(query._nombre, query._nAulas, query._nProfesores, 
                    query._nAlumnos, query._nCiclos)
                console.log(instituto)
                res.json({"nombre": instituto.nombre, "Alumnos por cada profesor: ": instituto.alumporprofesor()})
            }
        })
        .catch((mensaje) => {
            res.send(mensaje)
            console.log(mensaje)
        })
        db.desconectarBD()
    }

    private getProfesPorCiclo = async (req: Request, res: Response) => {
        const { nombre } = req.params
        await db.conectarBD()
        .then( async (mensaje) => {
            console.log(mensaje)
            const query: any = await Institutos.findOne({_nombre: nombre})
            if (query == null){
                console.log(query)
                res.json({})
            }else{
                const instituto = new Instituto(query._nombre, query._nAulas, query._nProfesores, 
                    query._nAlumnos, query._nCiclos)
                console.log(instituto)
                res.json({"nombre": instituto.nombre, "Profesores por cada ciclo: ": instituto.profesporciclo()})
            }
        })
        .catch((mensaje) => {
            res.send(mensaje)
            console.log(mensaje)
        })
        db.desconectarBD()
    }

    private getAulasUsadas = async (req: Request, res: Response) => {
        const { nombre } = req.params
        await db.conectarBD()
        .then( async (mensaje) => {
            console.log(mensaje)
            const query: any = await Institutos.findOne({_nombre: nombre})
            if (query == null){
                console.log(query)
                res.json({})
            }else{
                const instituto = new Instituto(query._nombre, query._nAulas, query._nProfesores, 
                    query._nAlumnos, query._nCiclos)
                console.log(instituto)
                res.json({"nombre": instituto.nombre, "Aulas en uso: ": instituto.aulasusadas()})
            }
        })
        .catch((mensaje) => {
            res.send(mensaje)
            console.log(mensaje)
        })
        db.desconectarBD()
    }

    private getDelete = async (req: Request, res: Response) => {
        const {nombre } = req.params
        await db.conectarBD()
        await Institutos.findOneAndDelete(
            { _nombre: nombre }, 
            (err: any, doc) => {
                if(err) console.log(err)
                else{
                    if (doc == null) {
                        console.log(`No encontrado`)
                        res.send(`No encontrado`)
                    }else {
                        console.log('Borrado correcto: '+ doc)
                        res.send('Borrado correcto: '+ doc)
                    }
                }
            })
        db.desconectarBD()
    }

    private actualiza = async (req: Request, res: Response) => {
        const { nombre } = req.params
        const { nAulas, nProfesores, nAlumnos, nCiclos } = req.body
        await db.conectarBD()
        await Institutos.findOneAndUpdate(
                { _nombre: nombre }, 
                {
                    _nombre: nombre,
                    _nAulas: nAulas,
                    _nProfesores: nProfesores,
                    _nAlumnos: nAlumnos,
                    _nCiclos: nCiclos
                },
                {
                    new: true,
                    runValidators: true // para que se ejecuten las validaciones del Schema
                }  
            )
            .then( (docu) => {
                    if (docu==null){
                        console.log('El instituto que desea modificar no existe')
                        res.json({"Error":"No existe: "+nombre})
                    } else {
                        console.log('Modificado Correctamente: '+ docu) 
                        res.json(docu)
                    }
                    
                }
            )
            .catch( (err) => {
                console.log('Error: '+err)
                res.json({error: 'Error: '+err })
            }
            )
        db.desconectarBD()
    }

    misRutas(){
        this._router.get('/', this.getInstitutos)
        this._router.post('/nuevoI', this.nuevoInstitutoPost)
        this._router.get('/totalpersonas/:nombre', this.getTotalPersonas)
        this._router.get('/alumporprofesor/:nombre', this.getAlumnosPorProfesor)
        this._router.get('/profesporciclo/:nombre', this.getProfesPorCiclo)
        this._router.get('/aulasusadas/:nombre', this.getAulasUsadas)
        this._router.get('/borrar/:nombre', this.getDelete)
        this._router.post('/actualiza/:nombre', this.actualiza)
    }
}

const obj = new InstitutoRoutes()
obj.misRutas()
export const institutoRoutes = obj.router
