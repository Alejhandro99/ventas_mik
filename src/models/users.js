const { Model, DataTypes } = require('sequelize')
const sequelize = require('./../db')

class Users extends Model {}

Users.init({
    usuario: {
        type: DataTypes.STRING(191)
    },
    password: {
        type: DataTypes.STRING(191)
    },
    condicion: {
        type: DataTypes.TINYINT(1)
    },
    idrol: {
        type: DataTypes.INTEGER(10)
    }
},{
    sequelize,
    modelName: 'Users',
    tableName: 'users_66'
})

module.exports = Users