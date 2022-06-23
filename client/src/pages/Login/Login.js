import { useState } from "react";
import "../../App.css";
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import Axios from "axios";
import Dados from "../../assets/components/Dados/Dados";
import Logado from "../Logado";

function Login(props) {
  const handleLogin = (values) => {
    console.log("teste")
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
    console.log(msgs.dado)
    if(msgs.msg === 'logado'){
      return <Logado user={msgs.dado.nome} dados={msgs} logout={ocultaDados}></Logado>
      //return <Dados email={msgs.dado.email} cpf={msgs.dado.cpf} func={ocultaDados} />
    }
  }

  const ocultaDados = () => {
    setMsg('')
  }
  var [msgs, setMsg] = useState('')


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


  return (
    <div className="container">
      {!msgs.msg && (
        <div className="container-filho">
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
                <Field name="password" className="form-field" placeholder="Insira sua senha aqui: " type="password"/>
    
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
          <div className="ou-login-cad">
            <p>Ou</p>
            <button onClick={props.abre}className="botao-entre-cad" >Cadastre-se</button>
          </div>
        </div>
      )}
      {teste()}
      {/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
      
    </div>
  );
}

export default Login;
