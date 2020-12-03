const Articulos = require('./../models/articulos')
const Categorias = require('./../models/categorias')
const DetalleV = require('./../models/detalle_venta')
const Ventas = require('./../models/ventas')
const Personas = require('./../models/personas')
const Roles = require('./../models/roles')
const Users = require('./../models/users')

Categorias.hasMany(Articulos, {foreignKey: 'idcategoria'})
Articulos.belongsTo(Categorias, {foreignKey: 'idcategoria'})

Articulos.hasMany(DetalleV, {foreignKey: 'idarticulo'})
DetalleV.belongsTo(Articulos, {foreignKey: 'idarticulo'})

Ventas.hasOne(DetalleV, {foreignKey: 'idingreso'})
DetalleV.belongsTo(Ventas, {foreignKey: 'idingreso'})

Users.hasMany(Ventas, {foreignKey: 'idusuario'})
Ventas.belongsTo(Users, {foreignKey: 'idusuario'})

Users.hasMany(Ventas, {foreignKey: 'idproveedor'})
Ventas.belongsTo(Users, {foreignKey: 'idproveedor'})

Personas.hasOne(Users, {foreignKey: 'id'})
Users.belongsTo(Personas, {foreignKey: 'id'})

Roles.hasOne(Users, {foreignKey: 'idrol'})
Users.belongsTo(Roles, {foreignKey: 'idrol'})