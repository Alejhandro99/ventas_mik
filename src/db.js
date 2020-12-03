const Sequelize = require('sequelize')

const sequelize = new Sequelize('ventas_mik', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize