const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db')

class Ventas extends Model {}

Ventas.init({
    idcliente: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    idusuario: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    tipo_comprobante: {
        type: DataTypes.STRING(20),
    },
    serie_comprobante: {
        type: DataTypes.STRING(7)
    },
    num_comprobante:{
        type: DataTypes.STRING(10)
    },
    fecha_hora: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW()
    },
    impuesto: {
        type: DataTypes.FLOAT(4, 2)
    },
    total: {
        type: DataTypes.FLOAT(11, 2)
    },
    estado: {
        type: DataTypes.STRING(20)
    }
},{
    sequelize,
    modelName: 'Ventas',
    tableName: 'ventas_79'
})

module.exports = Ventas