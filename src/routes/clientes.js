const { Router } = require('express')
const ruta = Router()
const { Op } = require('sequelize')
const Users = require('../models/users')
const Personas = require('../models/personas')

ruta.get('/', async (req, res) => {
    const clientes = await Personas.findAll({
        include: {
            model: Users,
            attributes: ['condicion']
        },
        where: {
            tipo_documento: 'C'
        }
    })

    res.json(clientes)
})

ruta.post('/registrar', async (req, res) => {
    const { nombre, num_documento, direccion, telefono, email} = req.body

    Personas.create({
        nombre: nombre,
        tipo_documento: 'C',
        num_documento: num_documento,
        direccion: direccion,
        telefono: telefono,
        email: email,
    }).then(persona => {
        Users.create({
            id: persona.id,
            condicion: 0,
            idrol: 3
        }).then(() => {
            res.json({message: 'Cliente Registrado !!'})
        }).catch(err => {
            res.json({message: 'Error al registrar el cliente: '+err.message})
        })
    })
})

ruta.get('/mostrar/:id', async (req, res) => {
    const cliente = await Personas.findByPk(req.params.id)
    res.json(cliente)
})

ruta.patch('/actualizar/:id', async (req, res) => {
    const { nombre, num_documento, direccion, telefono, email } = req.body
    const cliente = await Personas.findByPk(req.params.id)

    cliente.update({
        nombre: nombre,
        num_documento: num_documento,
        direccion: direccion,
        telefono: telefono,
        email: email
    }).then(() => {
        res.json({message: 'Cliente Actualizado !!'})
    }).catch(err => {
        res.json({message: 'Error al actualizar el cliente: '+ err.message})
    })
})

ruta.patch('/desactivar/:id', async (req, res) => {
    const cliente = await Users.findByPk(req.params.id)

    cliente.update({
        condicion: 1
    }).then(() => {
        res.json({message: 'Cliente Deshabilitado !!'})
    }).catch(err => {
        res.json({message: 'Error al deshabilitar el cliente: '+err.message})
    })
})

ruta.patch('/activar/:id', async (req, res) => {
    const cliente = await Users.findByPk(req.params.id)

    cliente.update({
        condicion: 0
    }).then(() => {
        res.json({message: 'Cliente Habilitado !!'})
    }).catch(err => {
        res.json({message: 'Error al habilitar el cliente: '+err})
    })
})

ruta.get('/buscar/:cliente',  async (req, res) => {
    const clientes = await Personas.findAll({
        include: {
            model: Users,
            attributes: ['condicion']
        },
        where: {
            [Op.or]: {
                num_documento: {
                    [Op.startsWith]: req.params.cliente,
                },
                nombre: {
                    [Op.startsWith]: req.params.cliente
                }
            },
            [Op.and]: {
                tipo_documento: 'C'
            }
        }
    })

    res.json(clientes)
})

module.exports = ruta