const { Model, DataTypes } = require('sequelize')
const sequelize = require('./../db')

class Personas extends Model {}

Personas.init({
    nombre: {
        type: DataTypes.STRING(100)
    },
    tipo_documento: {
        type: DataTypes.STRING(20)
    },
    num_documento: {
        type: DataTypes.STRING(20)
    },
    direccion: {
        type: DataTypes.STRING(70)
    },
    telefono: {
        type: DataTypes.STRING(20)
    },
    email: {
        type: DataTypes.STRING(50)
    },
}, {
    sequelize,
    modelName: 'Personas',
    tableName: 'personas_66'
})

module.exports = Personas