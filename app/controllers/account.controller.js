const db = require("../models");
const Accounts = db.accounts;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
    try {
        if (!req.body.email || !req.body.firstName || !req.body.lastName || !req.body.subscriptionStatus) {
            return res.status(400).send({
                message: "Content can not be empty!"
            });
        }

        if (!['subscribed', 'unsubscribed', 'pending'].includes(req.body.subscriptionStatus)) {
            return res.status(400).send({
                message: "Subscription Status is not valid"
            });
        }

        const accountsData = {
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            subscriptionStatus: req.body.subscriptionStatus,
        };

        const data = await Accounts.create(accountsData);
        res.send(data);
    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Accounts."
        });
    }
};

exports.findAll = async (req, res) => {
    try {
        const email = req.query.email;
        let condition = email ? { email: { [Op.iLike]: `%${email}%` } } : null;

        const data = await Accounts.findAll({ where: condition, logging: console.log });
       
        res.send(data);
    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Accountss."
        });
    }
};

exports.findOne = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Accounts.findByPk(id);

        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `Cannot find Accounts with id=${id}.`
            });
        }
    } catch (err) {
        res.status(500).send({
            message: "Error retrieving Accounts with id=" + id
        });
    }
};

exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const [num] = await Accounts.update(req.body, { where: { id: id } });

        if (num === 1) {
            res.send({
                message: "Accounts was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Accounts with id=${id}. Maybe Accounts was not found or req.body is empty!`
            });
        }
    } catch (err) {
        res.status(500).send({
            message: "Error updating Accounts with id=" + id
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        const num = await Accounts.destroy({ where: { id: id } });

        if (num === 1) {
            res.send({
                message: "Accounts was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Accounts with id=${id}. Maybe Accounts was not found!`
            });
        }
    } catch (err) {
        res.status(500).send({
            message: "Could not delete Accounts with id=" + id
        });
    }
};

exports.deleteAll = async (req, res) => {
    try {
        const nums = await Accounts.destroy({
            where: {},
            truncate: false
        });
        res.send({ message: `${nums} Accountss were deleted successfully!` });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while removing all Accountss."
        });
    }
};
