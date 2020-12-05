const Sequelize = require('sequelize')

const sequelize = new Sequelize('heroku_c8bf4ff4c71af7e', 'bcf5259f255dee', 'd0b2beb2', {
    host: 'us-cdbr-east-02.cleardb.com',
    dialect: 'mysql'
})

module.exports = sequelize