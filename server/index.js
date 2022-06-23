const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require('./User2');
const Pet = require("./Pet")
const Atendimento = require("./Atendimento")

const db2 = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "petinho",
});

const db = require("./db");


app.use(express.json());
app.use(cors());

app.post("/atendimento", async (req, res) => {
  const dado = req.body.data
  const hora = req.body.hora
  const email = req.body.email
  const telefone = req.body.telefone
  const nomePet = req.body.nomePet
  const especie = req.body.especie

  const atendimento = {
    dataAtendimento: dado,
    hora: hora,
    email: email,
    telefone: telefone,
    nomePet: nomePet,
    especie: especie,
  }

  await Atendimento.create(atendimento)
    .then(() => {
      return res.send({msg: "Atendimento cadastrado com suceso"})
    })
 })

app.post("/register", async (req, res) => {
  const email = req.body.email;
  const senha = req.body.password;
  const cpf = req.body.cpf
  const nomePet = req.body.nomePet
  const especie = req.body.especie
  const peso = req.body.peso
  const telefone = req.body.telefone
  const nome = req.body.nome

  const cliente = {
    email: email,
    senha: senha,
    cpf: cpf,
    telefone: telefone,
    nome: nome
  }

  const pet = {
    cpfdono: cpf,
    nome: nomePet,
    especie: especie,
    peso: peso,
  }

  console.log(pet)

  await User.create(cliente)
    .then(() => {
        return res.send({ msg: "Usuário cadastrado com sucesso" });
    }).catch((err) => {
        return res.status(400).json({
            erro: true,
            mensagem: "Não foi possível cadastra o usuário"
        })
    })

  await Pet.create(pet)
 });

app.post("/login", async(req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const emailExiste = await User.findOne({ where: { email: email } });
  const petExiste = await Pet.findByPk(emailExiste.cpf);
  if (emailExiste === null) {
    res.send({ msg: "erro" });
  } else {
    if(emailExiste.senha === password){
      res.send({ msg: "logado", dado: emailExiste, dadoPet: petExiste });
    }else{
      res.send({ msg: "erro" });
    }
  }

  // db2.query("SELECT * FROM clientes2s WHERE email = ?", [email], (err, result) => {
  //   if (err) {
  //     res.send(err);
  //   }
  //   if (result.length > 0) {
  //     bcrypt.compare(password, result[0].password, (error, response) => {
  //       if (error) {
  //         res.send(error);
  //       }
  //       if (response) {
  //         res.send({ msg: "Usuário logado" });
  //       } else {
  //         res.send({ msg: "Senha incorreta" });
  //       }
  //     });
  //   } else {
  //     res.send({ msg: "Usuário não registrado!" });
  //   }
  // });
});

app.listen(3001, () => {
  console.log("rodando na porta 3001");
});
