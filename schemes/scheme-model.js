const knex = require('knex');

const config = require('../knexfile');

const db = knex(config.development);

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}

function find() {
    return db('schemes');
};

function findById(id) {
    return db('schemes')
        .where({ id })
        .first();
};

function findSteps(id) {
    return db("steps")
        .join("schemes", "schemes.id", "=", "steps.scheme_id")
        .select("schemes.scheme_name", "steps.step_number", "steps.instructions")
        .where({ "schemes.id": id });
};

function add(scheme) {
    return db('schemes')
        .insert(scheme)
        .then( id => {
            return findById(id[0])
        });
};

function update(changes, id) {
    return db('schemes')
        .where('id', Number(id))
        .update(changes);
};

function remove(id) {
    return db('schemes')
        .where('id', Number(id))
        .del();
};