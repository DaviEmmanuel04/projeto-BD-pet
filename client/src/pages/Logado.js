import React, { useState } from "react";
import "../App.css";
import Dados from "../assets/components/Dados/Dados";
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import Axios from "axios";

function Logado(props) {
  const handleRegisterAtendimento = (values) => {
    console.log("teste");
    Axios.post("http://localhost:3001/atendimento", {
      data: values.data,
      hora: values.hora,
      email: (values.email = props.dados.dado.email),
      telefone: (values.telefone = props.dados.dado.telefone),
      nomePet: (values.nomePet = props.dados.dadoPet.nome),
      especie: (values.especie = props.dados.dadoPet.especie),
    }).then((response) => {
      alert(response.data.msg);
    });
  };
  const [res, setRes] = useState("");
  const [texto, setTexto] = useState("Ver dados");
  const validationsRegister = yup.object().shape({
    data: yup.string().required("A data é obrigatória"),
    hora: yup.string().required("Hora"),
  });
  const [dado, setMostraDado] = useState(false);

  const mostraDados = () => {
    if (dado) {
      return <Dados func={btnDado} dados={props.dados} />;
    }
  };
  const btnDado = () => {
    setMostraDado(!dado);
    if (dado) {
      setTexto("Ver dados");
    } else {
        setTexto("Ocultar dados");
    }
  };

  return (
   // <div className="logadoPai">
    <div className="logado">
      <h1 className="bem-vindo">Bem Vindo, {props.user}</h1>

      <div className="tit-dados">
        <h2 className="veja-dados">Dados do dono e do pet:</h2>

        <div>
          <button onClick={btnDado} className="botao-ver">
            {texto}
          </button>
        </div>
      </div>

      <div className="mostra-dados">{mostraDados()}</div>



      <h2 className="cad">Cadastre um atendimento:</h2>
      <Formik
        initialValues={{}}
        onSubmit={handleRegisterAtendimento}
        validationSchema={validationsRegister}
      >
        <div className="div-cadastro-ag">

          <Form className="form-cad">
            {/* Cadastro do pet */}
            <h4>Data e hora:</h4>
            <div className="form-group">
              <Field
                name="data"
                className="form-fielddh"
                placeholder="Nome do Pet"
                type="date"
              />
              <ErrorMessage
                component="span"
                name="data"
                className="form-error"
              ></ErrorMessage>
            </div>
            <div className="form-group">
              <Field name="hora" className="form-fielddh" type="time" />
              <ErrorMessage
                component="span"
                name="hora"
                className="form-error"
              ></ErrorMessage>
              <button className="button" type="submit">
                Cadastrar atendimento
              </button>
            </div>

          </Form>
        </div>
      </Formik>
      <button onClick={props.logout} className="bot-log">Sair</button>
    </div>
   // </div>
  );
}

export default Logado;
