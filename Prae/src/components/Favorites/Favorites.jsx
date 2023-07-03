import React, { useEffect, useState } from 'react';
import Header from '../../../src/components/Header/Header';
import Book from '../BookList/Book';
import './Favorites.css';

const Favorites = ({ userId }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = () => {
      const favoritesByUser = JSON.parse(localStorage.getItem('favoritesByUser')) || {};

      if (favoritesByUser[userId]) {
        const userFavorites = favoritesByUser[userId];
        setFavorites(userFavorites);
      }
    };

    fetchFavorites();
  }, [userId]);

  return (
    <>
      <Header />
      <section className='booklist'>
        <div className="container">
        <h2>Lista de Favoritos</h2>
      
        <div className='booklist-content grid'>
          {favorites.length === 0 ? (
            <p>Você não possui nenhum livro favorito.</p>
          ) : (
            favorites.map((book) => (
              <div className="book-item" key={book.id}>
                <Book userId={userId} {...book} />
              </div>
            ))
          )}
        </div>
        </div>
      </section>
    </>
  );
};

export default Favorites;
