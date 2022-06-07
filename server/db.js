const Sequelize = require("sequelize")

const conexao = new Sequelize("petinho", "root", "password", {
    host: "localhost",
    dialect: "mysql"
});

conexao.authenticate()
.then(() => {
    console.log("Conectou-se ao banco de dados com sucesso!");
})
.catch(() => {
    console.log("Não foi possível acessar a base de dados")
})

module.exports = conexao;