import { useState } from "react";
import "../../App.css";
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import Axios from "axios";

function Cadastro(props) {
 
  const handleRegister = (values) => {
    Axios.post("http://localhost:3001/register", {
      email: values.email,
      password: values.password,
      cpf: values.cpf,
      nomePet: values.petName,
      especie: values.especie,
      peso: values.peso,
      telefone: values.telefone,
      nome: values.nome,
    }).then((response) => {
      alert(response.data.msg);
    });
  };

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
    telefone: yup
      .number()
      .integer()
      .required("O telefone é obrigatório"),
    nome: yup
      .string()
      .required("O campo nome é obrigatório")
  });

  return (
    <div className="container1">
      <Formik
        initialValues={{}}
        onSubmit={handleRegister}
        validationSchema={validationsRegister}
        >
        <div className="container-filho1">
        
          <Form className="register-form">

            <div className="faca">
              <h1>Faça seu cadastro</h1>
            </div>

            <div className="dados-usu">
              <h4>Seus dados:</h4>
              <div className="form-group">
                <Field name="nome" className="form-field" placeholder="Nome: " />

                <ErrorMessage
                  component="span"
                  name="nome"
                  className="form-error"
                />
              </div>
              <div className="form-group">
                <Field name="email" className="form-field" placeholder="Email para cadastro aqui: " />

                <ErrorMessage
                  component="span"
                  name="email"
                  className="form-error"
                />
              </div>

              <div className="form-group">
                <Field name="password" className="form-field" placeholder="Senha para cadastro: " type="password"/>

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
                  type="password"
                />

                <ErrorMessage
                  component="span"
                  name="confirmation"
                  className="form-error"
                />
              </div>

              <div className="form-group">
                <Field
                  name="cpf"
                  className="form-field"
                  placeholder="Seu CPF:"
                />
                  <ErrorMessage
                    component="span"
                    name="cpf"
                    className="form-error"
                  >
                  </ErrorMessage>
              </div>

              <div className="form-group">
                <Field
                  name="telefone"
                  className="form-field"
                  placeholder="Seu Telefone: (XX) X XXXX-XXXX"
                />
                  <ErrorMessage
                    component="span"
                    name="telefone"
                    className="form-error"
                  >
                  </ErrorMessage>
              </div>
            </div>
            {/* Cadastro do pet */}
            <div className="dados-pet">
              <h4>Dados do Pet:</h4>
              <div className="form-group">
                <Field
                  name="petName"
                  className="form-field"
                  placeholder="Nome do seu Pet: "
                />
                  <ErrorMessage
                    component="span"
                    name="petName"
                    className="form-error"
                  >
                  </ErrorMessage>
              </div>
              <div className="form-group">
                <Field
                  name="especie"
                  className="form-field"
                  placeholder="Espécie: cachorro"
                />
                  <ErrorMessage
                    component="span"
                    name="especie"
                    className="form-error"
                  >
                  </ErrorMessage>
              </div>
              <div className="form-group">
                <Field
                  name="peso"
                  className="form-field"
                  placeholder="Peso em Kg: "
                />
                  <ErrorMessage
                    component="span"
                    name="peso"
                    className="form-error"
                  >
                  </ErrorMessage>
              </div>
            </div>
            <button className="button" type="submit">
              Cadastrar nova conta
            </button>
          </Form>
        </div>
      </Formik>

      <div className="ou-login-cad">
        <p>Ou</p>
        <button onClick={props.abre} className="botao-entre-cad">Entre na sua conta</button>    
      </div>
    </div>
  );
}

export default Cadastro;
