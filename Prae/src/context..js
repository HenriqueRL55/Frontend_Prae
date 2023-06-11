import React, { useState, useContext, useEffect } from 'react';
import { useCallback } from 'react';
const URL = "https://prae-backend-projeto.herokuapp.com/books/all";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resultTitle, setResultTitle] = useState("");

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(URL);
      const data = await response.json();
      const { books } = data;

      if (books.length > 0) {
        setBooks(books);

        if (books.length > 1) {
          setResultTitle("Resultados de sua busca!");
        } else {
          setResultTitle("Sem resultados!");
        }
      } else {
        setBooks([]);
        setResultTitle("Sem Resultados!");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return (
    <AppContext.Provider
      value={{
        loading,
        books,
        setSearchTerm,
        resultTitle,
        setResultTitle,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
