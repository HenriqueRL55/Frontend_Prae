import React, { useState, useContext } from "react";

import { AppProvider, AppContext } from "../auth/context";

import { Routes, Route, Navigate } from "react-router-dom";
import Private from "./Private";

import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import BookList from "../components/BookList/BookList";
import BookDetails from "../components/BookDetails/BookDetails";
import CrudBook from "../components/CrudBook/CrudBook";
import Login from "../components/Login/Login";

//bom dia

// a estrutura tá pronta, só fazer a página de login

// quando for chamar a função para login faz isso aqui
// const { authenticated, login, logout } = useContext(AppContext);
// e na hora de usar a função login ou logout chame esse de cima ai e passa o email e senha
// login(email, senha)
// logout()

//se precisar mudar algo da rota que vem do backend vai no arquivo context.jsx e muda lá

//o search form tá quebrado, tive que tirar

const RoutesFunction = () => {
  return (
    <AppProvider>
      <Routes>
        
        <Route path="/" element={<Login />}/> {/* rota pública */}

          <Route
            path="/home"
            element={
              <Private>
                <Home />
              </Private>
            }
          />

          {/*
            se quiser tornar uma rota privada(só mostra se logar) segue o exemplo abaixo

           <Route
            path="/home"
            element={
              <Private>
                <Home />
              </Private>
            }
          />  
          
          */}
        
      </Routes>
    </AppProvider>
  );
};

export default RoutesFunction;
