const { Router } = require('express')
const ruta = Router()
const { Op } = require('sequelize')
const Users = require('./../models/users')
const Personas = require('./../models/personas')
const Roles = require('./../models/roles')

ruta.get('/', async (req, res) => {
    const usuarios = await Personas.findAll({
        include: [{
            model: Users,
            include: [{
                model: Roles,
                attributes: ['nombre']
            }]
        }],
        where: {
            tipo_documento: 'U'
        }
    })

    res.json(usuarios)
})

ruta.post('/registrar', async (req, res) => {
    const { nombre, num_documento, direccion, telefono, email, usuario, password, rol } = req.body

    Personas.create({
        nombre: nombre,
        tipo_documento: 'U',
        num_documento: num_documento,
        direccion: direccion,
        telefono: telefono,
        email: email,
    }).then(persona => {
        Users.create({
            id: persona.id,
            usuario: usuario,
            password: password,
            condicion: 0,
            idrol: rol
        }).then(() => {
            res.json({message: 'Usuario Registrado !!'})
        }).catch(err => {
            res.json({message: ''})
        })
    }).catch(err => {
        res.json({message: ''})
    })
})

ruta.get('/mostrar/:id', async (req, res) => {
    const usuario = await Personas.findByPk(req.params.id, {
        include: [{
            model: Users
        }]
    })
    res.json(usuario)
})

ruta.patch('/actualizar/:id', async (req, res) => {
    const { num_documento, nombre, telefono, email, direccion, usuario, password, idrol } = req.body
    const persona = await Personas.findByPk(req.params.id)

    persona.update({
        numero_documento: num_documento,
        nombre: nombre,
        telefono: telefono,
        email: email,
        direccion: direccion
    }).then(async () => {
        const user = await Users.findByPk(req.params.id)
        user.update({
            usuario: usuario,
            password: password,
            idrol: idrol
        }).then(() => {
            res.json({message: 'Usuario Actualizado !!'})
        }).catch(err => {
            res.json({message: ''})
        })
    }).catch(err => {
        res.json({message: ''})
    })
})

ruta.patch('/desactivar/:id', async (req, res) => {
    const usuario = await Users.findByPk(req.params.id)

    usuario.update({
        condicion: 1
    }).then(() => {
        res.json({message: 'Usuario Deshabilitado !!'})
    }).catch(err => {
        res.json({message: ''})
    })
})

ruta.patch('/activar/:id', async (req, res) => {
    const usuario = await Users.findByPk(req.params.id)

    usuario.update({
        condicion: 0
    }).then(() => {
        res.json({message: 'Usuario Habilitado !!'})
    }).catch(err => {
        res.json({message: ''})
    })
})

ruta.get('/buscar/:usuario',  async (req, res) => {
    const usuarios = await Personas.findAll({
        include: Users,
        where: {
            nombre: {
                [Op.startsWith]: req.params.usuario
            },
            tipo_documento: 'U'
        }
    })

    res.json(usuarios)
})

ruta.get('/roles', async(req, res) => {
    const roles = await Roles.findAll({
        attributes: ['id', 'nombre']
    })

    res.json(roles)
})

module.exports = ruta