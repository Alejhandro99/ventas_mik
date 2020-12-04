const { Router } = require('express')
const { Op } = require('sequelize')
const ruta = Router()
const Articulos = require('./../models/articulos')
const Categorias = require('./../models/categorias')

ruta.get('/', async (req, res) => {
    const articulos = await Articulos.findAll({
        include: Categorias
    })

    res.json(articulos)
})

ruta.post('/registrar', async (req, res) => {
    const { categoria, codigo, nombre, precio_venta, stock, descripcion } = req.body

    Articulos.create({
        idcategoria: categoria,
        codigo: codigo,
        nombre: nombre,
        precio_venta: precio_venta,
        stock: stock,
        descripcion: descripcion,
        condicion: 0
    }).then(() => {
        res.json({message: 'Articulo Registrado !!'})
    }).catch(err => {
        res.json({message: 'Fallo al registrar articulo: '+err.message})
    })
})

ruta.get('/mostrar/:id', async (req, res) => {
    const articulo = await Articulos.findByPk(req.params.id)
    res.json(articulo)
})

ruta.patch('/actualizar/:id', async (req, res) => {
    const { categoria, codigo, nombre, precio_venta, stock, descripcion } = req.body
    const articulo = await Articulos.findByPk(req.params.id)
    
    articulo.update({
        idcategoria: categoria,
        codigo: codigo,
        nombre: nombre,
        precio_venta: precio_venta,
        stock: stock,
        descripcion: descripcion,
    }).then(() => {
        res.json({message: 'Articulo Actualizado !!'})
    }).catch(err => {
        res.json({message: 'Fallo al actualizar articulo: '+err.message})
    })
})

ruta.patch('/desactivar/:id',  async (req, res) => {
    const articulo = await Articulos.findByPk(req.params.id)

    articulo.update({
        condicion: 1
    }).then(() => {
        res.json({message: 'Articulo Desactivado !!'})
    }).catch(err => {
        res.json({message: 'Error al desactivar el articulo: '+err.message})
    })
})

ruta.patch('/activar/:id',  async (req, res) => {
    const articulo = await Articulos.findByPk(req.params.id)

    articulo.update({
        condicion: 0
    }).then(() => {
        res.json({message: 'Articulo Activado !!'})
    }).catch(err => {
        res.json({message: 'Error al activar el articulo: '+err.message})
    })
})

ruta.get('/buscar/:articulo', async (req, res) => {
    const articulos = await Articulos.findAll({
        include: {
            model: Categorias,
            attributes: ['nombre'],
        },
        where: {
            [Op.or]: {
                codigo: {
                    [Op.startsWith]: req.params.articulo
                },
                nombre: {
                    [Op.startsWith]: req.params.articulo
                },
                "$Categoria.nombre$": {
                        [Op.startsWith]: req.params.articulo
                    }
            }
        }
    })

    res.json(articulos)
})

module.exports = ruta