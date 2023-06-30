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

const RoutesFunction = () => {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <Private>
              <Home />
            </Private>
          }
        />
         <Route
          path="/about"
          element={
            <Private>
              <About />
            </Private>
          }
        />
          <Route
          path="/book"
          element={
            <Private>
              <BookList />
            </Private>
          }
        />
            <Route
          path="/crudBook"
          element={
            <Private>
              <CrudBook />
            </Private>
          }
        />

      </Routes>
    </AppProvider>
  );
};

export default RoutesFunction;
