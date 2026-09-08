const createDynamicModel = require('../models/dbModel');

const createTable = async (req, res) => {

    try {
        const { fields } = req.body;
        const Database = createDynamicModel(
            'Database',
            fields
        );
        await Database.sync();
        res.status(201).json({
            message: 'Dynamic table created successfully'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
};

const createRecord = async (req, res) => {
    try {

        const { fields, data } = req.body;

        const Expense = createDynamicModel('Expense', fields);

        const expense = await Expense.create(data);

        res.status(201).json({
            message: 'Record created successfully',
            expense
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: error.message
        });
    }
};
module.exports = {
    createTable,
    createRecord
};