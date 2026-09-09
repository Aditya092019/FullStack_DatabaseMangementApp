const sequelize = require('../utils/db-connection');
const { DataTypes } = require('sequelize');


const createDynamicModel = (tableName, fields) => {

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
            allowNull: false
        };
    }


    return sequelize.define(
        tableName,
        attributes,
        {
            tableName: tableName,
            freezeTableName: true,
            timestamps: true
        }
    );
};


module.exports = createDynamicModel;