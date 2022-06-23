const Sequelize = require("sequelize");
const db = require("./db");

const Pet = db.define('pets', {
    cpfdono: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    especie: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    peso: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
})

// Cria tabela caso não exista
Pet.sync();

module.exports = Pet;