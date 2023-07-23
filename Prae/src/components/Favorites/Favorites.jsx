import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../../src/components/Header/Header";
import Book from "../BookList/Book";
import "./Favorites.css";
import { useContext } from "react";
import { AppContext } from "../../auth/context";
import Loading from "../Loader/Loader";
import Footer from "../Footer/Footer";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const { user } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      setIsLoading(true);
      try {
        const url = `https://prae-backend-projeto.herokuapp.com/interests/user/${user.id}`;
        const response = await axios.get(url);
        const favorites = response.data.interests;

        // Busque as informações de cada livro favorito
        const books = await Promise.all(
          favorites.map(async (favorite) => {
            const bookUrl = `https://prae-backend-projeto.herokuapp.com/books/${favorite.book_id}`;
            const bookResponse = await axios.get(bookUrl);
            return bookResponse.data;
          })
        );

        setFavorites(books);
      } catch (error) {
        console.error("Erro ao buscar os livros favoritos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, [user.id]);

  return (
    <>
      <Header />
      <section className="booklist">
        <div className="container">
          <h2>Lista de Favoritos</h2>

          {isLoading ? (
            <Loading />
          ) : ( 
            <div className="booklist-content grid">
              {favorites.length === 0 ? (
                <p>Você não possui nenhum livro favorito.</p>
              ) : (
                favorites.map((favorite) => (
                  <div key={favorite.book.id}>
                    <Book
                      id={favorite.book.id}
                      title={favorite.book.title}
                      author={favorite.book.author}
                      cover={favorite.book.cover}
                    />
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Favorites;
