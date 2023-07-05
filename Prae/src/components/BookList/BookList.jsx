import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useContext } from "react";
import { useGlobalContext } from '../../context.';
import Book from "../BookList/Book";
import Loading from "../Loader/Loader";
import coverImg from '../../../src/images/cover_not_found.jpg';
import "./BookList.css";
import Header from '../Header/Header';
import { AppContext } from "../../auth/context"; 

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const booksPerPage = 8;
  const { user } = useContext(AppContext);
console.log(user)
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('https://prae-backend-projeto.herokuapp.com/books/all');
      setBooks(response.data.books);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleNextPage = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  const handlePreviousPage = () => {
    setPageNumber((prevPageNumber) => prevPageNumber - 1);
  };

  // Calculate the index range of books to be displayed on the current page
  const startIndex = (pageNumber - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;

  // Get the books to be displayed on the current page
  const booksToDisplay = books.slice(startIndex, endIndex);

  // Calculate the total number of pages
  const totalPages = Math.ceil(books.length / booksPerPage);

  // Filter books based on search term
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Update books to display based on search results
  const filteredBooksToDisplay = filteredBooks.slice(startIndex, endIndex);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPageNumber(1); // Reset page number when search term changes
  };

  return (
    <>
      <Header />
      <section className='booklist'>
        <div className='container'>
          <div className='section-title'>
            <h2>Lista de Livros</h2>
            <div className='search-form'>
              <input
                type='text'
                placeholder='Buscar por título...'
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div className='pagination'>
              <button
                className='pagination-button'
                onClick={handlePreviousPage}
                disabled={pageNumber === 1}
              >
                Anterior
              </button>
              <span className='pagination-page'>
                {pageNumber}/{totalPages}
              </span>
              <button
                className='pagination-button'
                onClick={handleNextPage}
                disabled={endIndex >= filteredBooks.length}
              >
                Próxima
              </button>
            </div>
          </div>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <div className='booklist-content grid'>
                {filteredBooksToDisplay.map((item, index) => {
                  return <Book key={index} {...item} />;
                })}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default BookList;