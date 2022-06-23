import { useState } from "react";
import "./App.css";
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import Axios from "axios";
import Dados from "./assets/components/Dados/Dados";

function App() {
  const handleLogin = (values) => {
    Axios.post("http://localhost:3001/login", {
      email: values.email,
      password: values.password,
    }).then((response) => {
      alert(response.data.msg);
      console.log(response.data.dadoPet)
      setMsg(response.data)
    });
  };

  const teste = () => {
    console.log(msgs.msg)
    if(msgs.msg === 'logado'){
      return <Dados email={msgs.dado.email} cpf={msgs.dado.cpf} func={ocultaDados} />
    }
  }

  const ocultaDados = () => {
    setMsg('')
  }
  var [msgs, setMsg] = useState('')
  const handleRegister = (values) => {
    Axios.post("http://localhost:3001/register", {
      email: values.email,
      password: values.password,
      cpf: values.cpf,
      nomePet: values.petName,
      especie: values.especie,
      peso: values.peso,
    }).then((response) => {
      alert(response.data.msg);
    });
  };

  const validationsLogin = yup.object().shape({
    email: yup
      .string()
      .email("email inválido")
      .required("O email é obrigatório"),
    password: yup
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres")
      .required("A senha é obrigatória"),
  });

  const validationsRegister = yup.object().shape({
    email: yup
      .string()
      .email("email inválido")
      .required("O email é obrigatório"),
    password: yup
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres")
      .required("A senha é obrigatória"),
    confirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "As senhas são diferentes")
      .required("A confirmação da senha é obrigatória"),
    cpf: yup
      .string()
      .min(11, "CPF inválido")
      .required("O campo CPF é obrigatório"),
    petName: yup
      .string()
      .required("O campo 'Nome do Pet' é obrigatório"),
    especie: yup
      .string()
      .required("O campo 'Espécie' é obrigatório"),
    peso: yup
      .number("O peso é um número")
      .integer("O peso é um número")
      .required("O campo 'Peso' é obrigatório"),
  });

  return (
    <div className="container">
      <h1>Entre na sua conta: </h1>
      <Formik
        initialValues={{}}
        onSubmit={handleLogin}
        validationSchema={validationsLogin}
      >
        <Form className="login-form">

          <div className="login-form-group">
            
            <Field name="email" className="form-field" placeholder="Insira seu email aqui: " />

            <ErrorMessage
              component="span"
              name="email"
              className="form-error"
            />
            
          </div>

          {/*Outro campo*/}
          <div className="form-group">
            <Field name="password" className="form-field" placeholder="Insira sua senha aqui: " />

            <ErrorMessage
              component="span"
              name="password"
              className="form-error"
            />
          </div>

          <button className="button" type="submit">
            Entrar na minha conta
          </button>
        </Form>
      </Formik>
      {/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
      {teste()}
      <h1>Ou faça seu cadastro: </h1>
      <Formik
        initialValues={{}}
        onSubmit={handleRegister}
        validationSchema={validationsRegister}
      >
        <Form className="register-form">
        <h4>Seus dados:</h4>
          <div className="register-form-group">
            <Field name="email" className="form-field" placeholder="Email para cadastro aqui: " />

            <ErrorMessage
              component="span"
              name="email"
              className="form-error"
            />
          </div>

          <div className="form-group">
            <Field name="password" className="form-field" placeholder="Senha para cadastro: " />

            <ErrorMessage
              component="span"
              name="password"
              className="form-error"
            />
          </div>

          <div className="form-group">
            <Field
              name="confirmation"
              className="form-field"
              placeholder="Repita a senha de cadastro: "
            />

            <ErrorMessage
              component="span"
              name="confirmation"
              className="form-error"
            />
          </div>

          <div className="register-form">
            <Field
              name="cpf"
              className="form-field"
              placeholder="CPF"
            />
              <ErrorMessage
                component="span"
                name="cpf"
                className="form-error"
              >
              </ErrorMessage>
          </div>
          {/* Cadastro do pet */}
          <h4>Dados do Pet:</h4>
          <div className="register-form">
            <Field
              name="petName"
              className="form-field"
              placeholder="Nome do Pet"
            />
              <ErrorMessage
                component="span"
                name="petName"
                className="form-error"
              >
              </ErrorMessage>
          </div>
          <div className="register-form">
            <Field
              name="especie"
              className="form-field"
              placeholder="Espécie"
            />
              <ErrorMessage
                component="span"
                name="especie"
                className="form-error"
              >
              </ErrorMessage>
          </div>
          <div className="register-form">
            <Field
              name="peso"
              className="form-field"
              placeholder="Peso em Kg"
            />
              <ErrorMessage
                component="span"
                name="peso"
                className="form-error"
              >
              </ErrorMessage>
          </div>

          <button className="button" type="submit">
            Cadastrar nova conta
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default App;
