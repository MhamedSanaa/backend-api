const Employee = require('../model/Employee')

const getAllEmployees = async (req, res) => {
    const employees = await Employee.find({});
    if (!employees) return res.status(204).json({'message':'no employees found'});
    res.json(employees);
}

const createNewEmployee = async (req, res) => {
    if (!req?.body?.firstname || !req?.body?.firstname) {
        return res.status(400).json({'message':'first and last name required'})
    }
    try {
        const result = await Employee.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
        });

        res.status(201).json(result);
    } catch (error) {
        console.error(error);
    }
}

const updateEmployee = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({'message':'id parameter required'});
    }
    const employee = await Employee.findOne({ _id: req.body.id }).exec();

    if (!employee) {
        return res.status(204).json({ "message": `no emplyee matches Id: ${req.body.id}` });
    }

    if (req.body.firstname) employee.firstname = req.body.firstname;
    if (req.body.lastname) employee.lastname = req.body.lastname;
    
    const result = await employee.save();
    res.json(result);
}

const deleteEmployee = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({'message':'id parameter required'});
    }

    const employee = await Employee.findOne({ _id: req.body.id }).exec();

    if (!employee) {
        return res.status(204).json({ "message": `no emplyee matches Id: ${req.body.id}.` });
    }
    
    const result = await employee.deleteOne({ _id: req.body.id });
    res.json(result);
}

const getEmployee = async (req, res) => {
    if (!req?.params?.id) {
        return res.status(400).json({'message':'id parameter required'});
    }
    const employee = await Employee.findOne({ _id: req.params.id }).exec();

    if (!employee) {
        return res.status(204).json({ "message": `no emplyee matches Id: ${req.body.id}.` });
    }

    res.json(employee);
}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}