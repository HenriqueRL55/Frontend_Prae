import React, { useState, useContext, useEffect, useCallback, createContext } from 'react';

import {useNavigate} from "react-router-dom";
import api from "../api/api";

const URL = 'https://prae-backend-projeto.herokuapp.com/books/all';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [resultTitle, setResultTitle] = useState('');
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(URL);
      const data = await response.json();
      const { books } = data;

      if (books.length > 0) {
        if (searchTerm !== '') {
          const filteredBooks = books.filter((book) =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setBooks(filteredBooks);
          setResultTitle(
            filteredBooks.length > 0 ? 'Resultados de sua busca!' : 'Sem resultados!'
          );
        } else {
          setBooks(books);
          setResultTitle(books.length > 1 ? 'Resultados de sua busca!' : 'Sem resultados!');
        }
      } else {
        setBooks([]);
        setResultTitle('Sem resultados!');
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);


  useEffect(() => {
    const storageUser = localStorage.getItem("user");
    if (storageUser) {
      setUser(JSON.parse(storageUser));
    }
    setLoading(false);
  }, []);


  const login = async (email, password) => {
    try { 
      const response =  await api.post("/login", {email, password})
      
      navigate("home");

      setUser(user);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  const logout = () => {
    setUser(null);
    api.defaults.headers.Authorization = null;
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <AppContext.Provider
      value={{
        books,
        resultTitle,
        searchTerm,
        setSearchTerm,
        fetchBooks,     
        authenticated:!!user, user, login, logout}}
      >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
