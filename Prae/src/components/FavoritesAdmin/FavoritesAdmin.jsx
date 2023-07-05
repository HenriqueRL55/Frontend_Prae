import React, { useEffect, useState } from 'react';
import Header from '../../../src/components/Header/Header';
import './FavoritesAdmin.css';
import Book from '../BookList/Book';

const FavoritesAdmin = ({ userId }) => {
  const [favorites, setFavorites] = useState([]);
  const [searchAuthor, setSearchAuthor] = useState('');
  const [filteredFavorites, setFilteredFavorites] = useState([]);

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

  useEffect(() => {
    const filterFavoritesByAuthor = () => {
      if (searchAuthor.trim() === '') {
        setFilteredFavorites(favorites);
      } else {
        const filtered = favorites.filter((book) =>
          book.author.toLowerCase().includes(searchAuthor.toLowerCase())
        );
        setFilteredFavorites(filtered);
      }
    };

    filterFavoritesByAuthor();
  }, [searchAuthor, favorites]);

  const handleSearchChange = (event) => {
    setSearchAuthor(event.target.value);
  };

  return (
    <>
      <Header />
      <section className='booklist'>
        <div className='container'>
          <h2>Troca de Livros</h2>

          <div className='search-form'>
            <input
              type='text'
              placeholder='Pesquisar por usuário'
              value={searchAuthor}
              onChange={handleSearchChange}
            />
          </div>

          <div className='booklist-content grid'>
            {filteredFavorites.length === 0 ? (
              <p>Nenhum livro favorito encontrado para o usuário pesquisado.</p>
            ) : (
              filteredFavorites.map((book) => (
                <div key={book.id}>
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

export default FavoritesAdmin;
