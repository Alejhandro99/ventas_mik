const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db')

class DetalleV extends Model {}

DetalleV.init({
    idventa: {
        type: DataTypes.INTEGER(10)
    },
    idarticulo: {
        type: DataTypes.INTEGER(10)
    },
    cantidad: {
        type: DataTypes.INTEGER(11)
    },
    precio: {
        type: DataTypes.FLOAT(11, 2)
    }
}, {
    sequelize,
    modelName: 'DetalleV',
    tableName: 'detalle_venta_79'
})

module.exports = DetalleV