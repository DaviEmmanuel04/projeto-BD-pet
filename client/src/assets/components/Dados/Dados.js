import React from "react";
import "../../../App.css"


function Dados(props) {
  return (

      <div className="h3">

        <div className="dados">
          
          <div className="dados-do-usu">
            <h3>Dados do usuário</h3>
            <p>Nome: <span> {props.dados.dado.nome} </span></p>
            <p>CPF: <span>{props.dados.dado.cpf}</span></p>
            <p>Email:<span> {props.dados.dado.email} </span></p>
          </div>

          <div className="dados-do-pet">
            <h3>Dados do Pet</h3>
            <p>Nome: <span> {props.dados.dadoPet.nome} </span></p>
            <p>Especie:<span> {props.dados.dadoPet.especie} </span></p>
          </div>

        </div>
      </div>
  );
}

export default Dados;
