const Sequelize = require("sequelize");
const db = require("./db");

const User2 = db.define('clientes2', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

// Cria tabela caso não exista
User2.sync();

module.exports = User2;