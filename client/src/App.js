  import React, { useState } from "react";
import Login from "./pages/Login/Login";
import Cadastro from "./pages/Login/Cadastro";

function App () {
  const [cadastro, setCadastro] = useState(false)

  const abreCadastro = () => {
    setCadastro(!cadastro)
    console.log(cadastro)
  }

  const mostraCadastro = () => {
    if(cadastro){
      return <Cadastro abre={abreCadastro}></Cadastro>
    }else {
      return <Login abre={abreCadastro}></Login>
    }
  }

  return (
    <div className="app">
      {mostraCadastro()}
      {/* {cadastro && (
        <Cadastro></Cadastro>
      )} */}
    </div>
  )
}

export default App