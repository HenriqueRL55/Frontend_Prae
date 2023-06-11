import React, { useState, useContext, useEffect, useCallback } from 'react';
const URL = 'https://prae-backend-projeto.herokuapp.com/books/all';
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resultTitle, setResultTitle] = useState('');

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

  return (
    <AppContext.Provider
      value={{
        loading,
        books,
        setSearchTerm,
        resultTitle,
        setResultTitle,
        searchTitle: searchTerm,
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
