import React, { useState, useContext } from "react";
import { AppProvider, AppContext } from "../auth/context";
import { Routes, Route, Navigate } from "react-router-dom";
import Private from "./Private";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import BookList from "../components/BookList/BookList";
import CrudBook from "../components/CrudBook/CrudBook";
import Login from "../components/Login/Login";
import Favorites from "../components/Favorites/Favorites";
import Register from "../components/Register/Register";
import FavoritesAdmin from "../components/FavoritesAdmin/FavoritesAdmin";

const RoutesFunction = () => {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

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
        
        <Route
          path="/favorites"
          element={
            <Private>
              <Favorites />
            </Private>
          }
        />

<Route
          path="/favoritesAdmin"
          element={
            <Private>
              <FavoritesAdmin />
            </Private>
          }
        />

      </Routes>
    </AppProvider>
  );
};

export default RoutesFunction;
