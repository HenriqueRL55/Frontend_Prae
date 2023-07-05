import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../../src/components/Header/Header";
import Book from "../BookList/Book";
import "./FavoritesAdmin.css";
import Select from "react-select";

const FavoritesAdmin = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const url = "https://prae-backend-projeto.herokuapp.com/interests/all";
        const response = await axios.get(url);
        setFavorites(response.data.interests);
      } catch (error) {
        console.error("Erro ao buscar os livros favoritos:", error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <>
      <Header />
      <section className="booklist">
        <div className="container">
          <h2>Dashboard de interesses</h2>

          <div className="booklist-content grid">
            {favorites.length === 0 ? (
              <p>Nenhum livro foi favoritado.</p>
            ) : (
              favorites.map((favorite) => (
                <div key={favorite.id}>
                  {console.log(favorite)}
                  <Book
                    id={favorite.book_id}
                    title={favorite.book_title}
                    author={favorite.book_author}
                    cover={favorite.cover}
                  />
                  <div className="changeStyle">
                    <div>
                      <span> Nome: {favorite.user_name}</span>
                      <span> Categoria: {favorite.book_category}</span>
                    </div>
                    <div className="AutocompleteStyle">
                      <Select
                        className="select"
                        // value={selectedUserType}
                        // onChange={handleUserTypeChange}
                        // options={userOptions}
                        placeholder="Em andamento"
                        //isSearchable={false}
                        required
                      />
                    </div>
                  </div>
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
