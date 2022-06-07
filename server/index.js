const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require('./User2');

// const db = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "banco-pet",
// });

const db = require("./db")

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  const email = req.body.email;
  const senha = req.body.password;
  const retorno = {
    email: email,
    senha: senha,
  }
  await User.create(retorno)
    .then(() => {
        return res.send({ msg: "Usuário cadastrado com sucesso" });
    }).catch((err) => {
        return res.status(400).json({
            erro: true,
            mensagem: "Não foi possível cadastra o usuário"
        })
    })

//   db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, result) => {
//     if (err) {
//       res.send(err);
//     }
//     if (result.length == 0) {
//       bcrypt.hash(password, saltRounds, (err, hash) => {
//         db.query(
//           "INSERT INTO usuarios (email, password) VALUES (?,?)",
//           [email, hash],
//           (error, response) => {
//             if (err) {
//               res.send(err);
//             }

//             res.send({ msg: "Usuário cadastrado com sucesso" });
//           }
//         );
//       });
//     } else {
//       res.send({ msg: "Email já cadastrado" });
//     }
//   });
 });

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (error) {
          res.send(error);
        }
        if (response) {
          res.send({ msg: "Usuário logado" });
        } else {
          res.send({ msg: "Senha incorreta" });
        }
      });
    } else {
      res.send({ msg: "Usuário não registrado!" });
    }
  });
});

app.listen(3001, () => {
  console.log("rodando na porta 3001");
});
