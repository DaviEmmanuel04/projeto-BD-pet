const { INTEGER } = require("sequelize");
const sequelize = require("sequelize");
const Sequelize = require("sequelize");
const db = require("./db");

const Atendimento = db.define('atendimentos', {
    dataAtendimento: {
        type: Sequelize.DATEONLY,
        primaryKey: true,
        allowNull: false
    },
    hora: {
        type: Sequelize.TIME,
        primaryKey: true,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telefone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nomePet: {
        type: Sequelize.STRING,
        allowNull: false
    },
    especie: {
        type: Sequelize.STRING,
        allowNull: false
    }
    
})

// Cria tabela caso não exista
Atendimento.sync();

module.exports = Atendimento;