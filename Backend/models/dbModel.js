const sequelize = require('../utils/db-connection');
const {DataTypes} = require('sequelize');


const createDynamicModel = (fieldName, fields) => {
    const attributes = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        }
    };

    for (const fieldName in fields) {
        const fieldType = fields[fieldName];
        if (!DataTypes[fieldType]) {
            throw new Error(`Invalid datatype: ${fieldType}`);
        }
        attributes[fieldName] = {
            type: DataTypes[fieldType],
            allowNull: true
        };
    }
    return sequelize.define(fieldName, attributes);
};




module.exports = createDynamicModel;

