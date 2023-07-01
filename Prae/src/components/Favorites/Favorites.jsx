import React, { useEffect, useState } from 'react';
import Header from '../../../src/components/Header/Header';
import Book from '../BookList/Book';

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
      <section className='favorites'>
        <h1>Meus Favoritos</h1>
        <div className='favorites-list'>
          {favorites.map((book) => (
            <Book key={book.id} userId={userId} {...book} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Favorites;