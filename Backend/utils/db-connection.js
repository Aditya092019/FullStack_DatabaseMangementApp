const {Sequelize} = require('sequelize');


const sequelize = new Sequelize('dbmanagement','root','root',{
    host:'localhost',
    dialect:'mysql'
})

module.exports = sequelize;


