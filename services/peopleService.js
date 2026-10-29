
const pool = require("../config/db");

async function getAllPeople() {
    const result = await pool.query(
        "SELECT id, name, balance FROM people ORDER BY id"
    );

    return result.rows;
}

async function createPerson(name, balance) {
    const result = await pool.query(
        "INSERT INTO people (name, balance) VALUES ($1, $2) RETURNING id, name, balance",
        [name, balance]
    );

    return result.rows[0];
}

async function updatePerson(id, name, balance) {
    const result = await pool.query(
        "UPDATE people SET name = $1, balance = $2 WHERE id = $3 RETURNING id, name, balance",
        [name, balance, id]
    );

    return result.rows[0] || null;
}

async function deletePerson(id) {
    const result = await pool.query(
        "DELETE FROM people WHERE id = $1 RETURNING id"
    , [id]);

    return result.rowCount > 0;
}

module.exports = {
    getAllPeople,
    createPerson,
    updatePerson,
    deletePerson
};
