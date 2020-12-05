const Sequelize = require('sequelize')

const sequelize = new Sequelize('ventas_mik', 'alejhandro99', 'Alejhandro99$', {
    host: 'db4free.net',
    dialect: 'mysql'
})

module.exports = sequelize