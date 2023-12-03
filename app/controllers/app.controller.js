const db = require("../models");
const Apps = db.apps;
const Accounts = db.accounts;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
    try {
        if (!req.body.name || !req.body.network || !req.body.apiKey || !req.body.developerID) {
            return res.status(400).send({
                message: "Content can not be empty!"
            });
        }

        const checkAppNameIsAvailable = await Apps.findAll({
            where: { name: req.body.name },
            logging: console.log
        });

        if ((checkAppNameIsAvailable || []).length !== 0) {
            return res.status(400).send({
                message: "App name is already available."
            });
        }

        const appsData = {
            name: req.body.name,
            network: req.body.network,
            apiKey: req.body.apiKey,
            developerID: req.body.developerID,
        };

        const data = await Apps.create(appsData);
        res.send(data);
    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Apps."
        });
    }
};

exports.findAllByDeveloperID = async (req, res) => {
    try {
        const developerID = req.params.developerID;

        const checkDeveloperIDIsAvailable = await Accounts.findAll({ where: { id: developerID } });

        if ((checkDeveloperIDIsAvailable || []).length === 0) {
            return res.status(400).send({
                message: "Please enter a valid developer ID."
            });
        }

        const data = await Apps.findAll({ where: { developerID }, logging: console.log });
        
        res.send(data);
    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Appss."
        });
    }
};

exports.findAll = async (req, res) => {
    try {
        const name = req.query.name;
        let condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

        const data = await Apps.findAll({ where: condition, logging: console.log });
      
        res.send(data);
    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Appss."
        });
    }
};


exports.findOne = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Apps.findByPk(id);

        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `Cannot find Apps with id=${id}.`
            });
        }
    } catch (err) {
        res.status(500).send({
            message: "Error retrieving Apps with id=" + id
        });
    }
};


exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const [num] = await Apps.update(req.body, { where: { id: id } });

        if (num === 1) {
            res.send({
                message: "Apps was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Apps with id=${id}. Maybe Apps was not found or req.body is empty!`
            });
        }
    } catch (err) {
        res.status(500).send({
            message: "Error updating Apps with id=" + id
        });
    }
};


exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        const num = await Apps.destroy({ where: { id: id } });

        if (num === 1) {
            res.send({
                message: "Apps was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Apps with id=${id}. Maybe Apps was not found!`
            });
        }
    } catch (err) {
        res.status(500).send({
            message: "Could not delete Apps with id=" + id
        });
    }
};
