const createDynamicModel = require('../models/dbModel');
const sequelize = require("../utils/db-connection");

const createTable = async (req, res) => {
    try {

        const { tableName, fields } = req.body;

        console.log("Table Name:", tableName);
        console.log("Fields:", fields);

        const Model = createDynamicModel(tableName, fields);

        console.log("Model attributes:",
            Object.keys(Model.getAttributes())
        );

        await Model.sync({
            alter: true
        });

        res.status(201).json({
            message: "Table created successfully",
            tableName,
            fields
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: error.message
        });
    }
};

const createRecord = async (req, res) => {

    try {
        const {
            tableName,
            fields,
            data
        } = req.body;
        const Model =
            createDynamicModel(tableName, fields);
        const record =
            await Model.create(data);
        res.status(201).json({
            message: "Record inserted successfully",
            record
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message
        });
    }
}

const fetchRecords = async (req, res) => {
    try {
        const { tableName } = req.params;

        const query = `SELECT * FROM \`${tableName}\``;

        const [records] = await sequelize.query(query);

        res.status(200).json({
            success: true,
            records
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


const deleteRecord = async (req, res) => {
    try{
        const { tableName, id } = req.params;

        const query = `DELETE FROM \`${tableName}\` WHERE id = ?`;

        const [result] = await sequelize.query(query, {
            replacements: [id]
        });

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Record not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Record deleted successfully"
        });
    }catch(error){
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    createTable,
    createRecord,
    fetchRecords,
    deleteRecord
};