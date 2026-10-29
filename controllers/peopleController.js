
const peopleService = require("../services/peopleService");

async function getPeople(req, res, next) {
    try {
        const people = await peopleService.getAllPeople();
        res.json({ success: true, data: people });
    } catch (error) {
        next(error);
    }
}

async function createPerson(req, res, next) {
    try {
        const { name, balance = 0 } = req.body;

        if (typeof name !== "string" || !name.trim()) {
            return res.status(400).json({
                success: false,
                message: "Name is required"
            });
        }

        const parsedBalance = Number(balance);

        if (!Number.isFinite(parsedBalance)) {
            return res.status(400).json({
                success: false,
                message: "Balance must be a valid number"
            });
        }

        const person = await peopleService.createPerson(
            name.trim(),
            parsedBalance
        );

        res.status(201).json({ success: true, data: person });
    } catch (error) {
        next(error);
    }
}

async function updatePerson(req, res, next) {
    try {
        const id = Number(req.params.id);
        const { name, balance } = req.body;
        const parsedBalance = Number(balance);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid person ID"
            });
        }

        if (typeof name !== "string" || !name.trim()) {
            return res.status(400).json({
                success: false,
                message: "Name is required"
            });
        }

        if (balance === undefined || !Number.isFinite(parsedBalance)) {
            return res.status(400).json({
                success: false,
                message: "Balance must be a valid number"
            });
        }

        const person = await peopleService.updatePerson(
            id,
            name.trim(),
            parsedBalance
        );

        if (!person) {
            return res.status(404).json({
                success: false,
                message: "Person not found"
            });
        }

        res.json({ success: true, data: person });
    } catch (error) {
        next(error);
    }
}

async function deletePerson(req, res, next) {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid person ID"
            });
        }

        const deleted = await peopleService.deletePerson(id);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Person not found"
            });
        }

        res.json({ success: true, message: "Person deleted successfully" });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getPeople,
    createPerson,
    updatePerson,
    deletePerson
};
