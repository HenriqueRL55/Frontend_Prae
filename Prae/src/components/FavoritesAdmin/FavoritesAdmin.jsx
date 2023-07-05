import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../../src/components/Header/Header";
import Book from "../BookList/Book";
import "./FavoritesAdmin.css";
import Select from "react-select";

const FavoritesAdmin = () => {
  const [favorites, setFavorites] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const statusOptions = [
    { value: 0, label: "Pendente" },
    { value: 1, label: "Aceito" },
    { value: 2, label: "Negado" },
    { value: 3, label: "Aceito - vale" },
    { value: 4, label: "Cancelado" },
  ];

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const url = "https://prae-backend-projeto.herokuapp.com/interests/all";
      const response = await axios.get(url);
      setFavorites(response.data.interests);

      // Atualize o estado selectedStatuses com os valores de status retornados pela API
      const newSelectedStatuses = response.data.interests.reduce(
        (acc, favorite) => {
          acc[favorite.book_id] = statusOptions.find(
            (option) => option.value === favorite.status
          );
          return acc;
        },
        {}
      );
      setSelectedStatuses(newSelectedStatuses);
    } catch (error) {
      console.error("Erro ao buscar os livros favoritos:", error);
    }
  };

  const handleStatusChange = (bookId, selectedOption) => {
    setSelectedStatuses((prevStatuses) => ({
      ...prevStatuses,
      [bookId]: selectedOption,
    }));
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleSubmit = () => {
    setShowConfirmation(true);
  };

  const handleConfirm = async () => {
    try {
      const interestId = selectedBook.id;
      console.log("ID do interesse:", interestId); // Imprime o ID do interesse
      const status = selectedStatuses[selectedBook.book_id].value;

      const url = `https://prae-backend-projeto.herokuapp.com/interests/${interestId}/?status=${status}`;


      await axios.put(url);

      // Atualize a lista de livros favoritos após a atualização do status
      fetchFavorites();
    } catch (error) {
      console.error("Erro ao atualizar o status do livro:", error);
    }

    setShowModal(false);
    setShowConfirmation(false);
  };

  const handleCancel = () => {
    setShowModal(false);
    setShowConfirmation(false);
  };

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
                    onClick={() => handleBookClick(favorite)}
                  />
                </div>
              ))
            )}
          </div>
          {showModal && (
            <div className="modal">
              <div className="modal-content">
                <button className="modal-close" onClick={handleCancel}>
                  X
                </button>
                <h2>{selectedBook.book_title}</h2>
                <div className="changeStyle">
                  <div>
                    <span> Nome: {selectedBook.user_name}</span>
                    <span> Categoria: {selectedBook.book_category}</span>
                  </div>
                  <div className="AutocompleteStyle">
                    <Select
                     className="select"
                     value={selectedStatuses[selectedBook.book_id]}
                     onChange={(selectedOption) =>
                       handleStatusChange(selectedBook.book_id, selectedOption)
                     }
                     options={statusOptions}
                     placeholder="Em andamento"
                     required
                    />
                    {!showConfirmation ? (
                      <button onClick={handleSubmit}>Enviar</button>
                    ) : (
                      <>
                        <p>Deseja realizar essa ação?</p>
                        <button onClick={handleConfirm}>Sim</button>
                        <button onClick={handleCancel}>Não</button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default FavoritesAdmin;
