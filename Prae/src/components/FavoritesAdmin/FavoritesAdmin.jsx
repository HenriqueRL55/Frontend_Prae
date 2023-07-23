import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../../src/components/Header/Header";
import Book from "../BookList/Book";
import "./FavoritesAdmin.css";
import Select from "react-select";
import Loading from "../Loader/Loader";
import Footer from "../Footer/Footer";

const FavoritesAdmin = () => {
  const [favorites, setFavorites] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [filterStatus, setFilterStatus] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const booksPerPage = 8;
  const [showBookInput, setShowBookInput] = useState(false);
  const [bookTitle, setBookTitle] = useState("");

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
    setIsLoading(true);
    try {
      const url = "https://prae-backend-projeto.herokuapp.com/interests/all";
      const response = await axios.get(url);
      setFavorites(response.data.interests);

      // Atualize o estado selectedStatuses com os valores de status retornados pela API
      const newSelectedStatuses = response.data.interests.reduce(
        (acc, favorite) => {
          acc[favorite.id] = statusOptions.find(
            (option) => option.value === favorite.status
          );
          return acc;
        },
        {}
      );
      setSelectedStatuses(newSelectedStatuses);
    } catch (error) {
      console.error("Erro ao buscar os livros favoritos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = (interestId, selectedOption) => {
    setSelectedStatuses((prevStatuses) => ({
      ...prevStatuses,
      [interestId]: selectedOption,
    }));
    setShowBookInput(selectedOption.value === 1);
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
      // Update the book status
      const interestId = selectedBook.id;
      console.log("ID do interesse:", interestId); // Imprime o ID do interesse
      const status = selectedStatuses[interestId].value;

      const url = `https://prae-backend-projeto.herokuapp.com/interests/${interestId}/?status=${status}`;
      await axios.put(url);

      // Create a new book if the "Aceito" option is selected and only if the option was changed            
      if (
        (status === 1) &&
        bookTitle
      ) {
        await axios.post("https://prae-backend-projeto.herokuapp.com/books", {
          title: bookTitle,
          interestId: interestId,
        });
        setBookTitle("");
      }

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
    setBookTitle("");
  };

  // Calculate the number of pages
  const pageCount = Math.ceil(
    favorites.filter((favorite) =>
      filterStatus
        ? selectedStatuses[favorite.id]?.value === filterStatus.value
        : true
    ).length / booksPerPage
  );

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pageCount) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <Header />
      <section className="booklist">
        <div className="container">
          <h2>Dashboard de interesses</h2>
          <div className="filter-container">
            <label htmlFor="filter-status">Filtrar por status:</label>
            <Select
              id="filter-status"
              className="select"
              value={filterStatus}
              onChange={setFilterStatus}
              options={statusOptions}
              placeholder="Selecione um status"
            />
            <label htmlFor="search-term">Buscar por nome:</label>
            <input
              id="search-term"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="pagination">
              <button
                className="paginationButton"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Anterior
              </button>
              <span className="paginationPage">
                {currentPage}/{pageCount}
              </span>
              <button
                className="paginationButton"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Próximo
              </button>
            </div>
          </div>
          {isLoading ? (
            <Loading />
          ) : (
            <div className="booklist-content grid">
              {favorites.length === 0 ? (
                <p>Nenhum livro foi favoritado.</p>
              ) : (
                favorites
                  .filter((favorite) =>
                    filterStatus
                      ? selectedStatuses[favorite.id]?.value ===
                        filterStatus.value
                      : true
                  )
                  .filter((favorite) =>
                    searchTerm
                      ? favorite.user_name
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      : true
                  )
                  .slice(
                    (currentPage - 1) * booksPerPage,
                    currentPage * booksPerPage
                  )
                  .map((favorite) => (
                    <div className="bookCard" key={favorite.id}>
                      {console.log(favorite)}
                      <Book
                        id={favorite.book_id}
                        title={favorite.book_title}
                        author={favorite.book_author}
                        cover={favorite.cover}
                        onClick={() => handleBookClick(favorite)}
                      />
                      <div className="statusBook">
                        {selectedStatuses[favorite.id]
                          ? selectedStatuses[favorite.id].label
                          : " Cancelado"}
                      </div>
                    </div>
                  ))
              )}
            </div>
          )}
          {showModal && (
            <div className="modal">
              <div className="modal-content">
                <div className="xButton">
                  <button className="modal-close" onClick={handleCancel}>
                    X
                  </button>
                </div>
                <div className="titleModalBook">
                  <h2>{selectedBook.book_title}</h2>
                </div>

                <div className="infoUserBook">
                  <span> Nome: {selectedBook.user_name}</span>
                  <span> Categoria: {selectedBook.book_category}</span>
                  <span> Curso: {selectedBook.user_course}</span>
                  {selectedBook.status === 1 && selectedBook.traded_book_title && ( 
                   <span> Livro deixado: {selectedBook.traded_book_title}</span>
                  )}
                </div>
                <div className="AutocompleteStyle">
                  <Select
                    className="select"
                    value={selectedStatuses[selectedBook.id]}
                    onChange={(selectedOption) =>
                      handleStatusChange(selectedBook.id, selectedOption)
                    }
                    options={statusOptions}
                    placeholder="Em andamento"
                    required
                  />
                </div>

                {showBookInput && (
                  <>
                    <label htmlFor="book-title">
                      Qual livro será adicionado ao acervo?
                    </label>
                    <input
                      id="book-title"
                      type="text"
                      value={bookTitle}
                      onChange={(e) => setBookTitle(e.target.value)}
                    />
                  </>
                )}

                <div className="buttonModalBook">
                  {!showConfirmation ? (
                    <button className="buttonModalBook2" onClick={handleSubmit}>
                      Enviar
                    </button>
                  ) : (
                    <>
                      <div className="buttonModalBook3">
                        <div>Deseja relizar essa ação?</div>
                        <button
                          className="buttonModalBookButton3"
                          onClick={handleConfirm}
                        >
                          Sim
                        </button>
                        <button
                          className="buttonModalBookButton3"
                          onClick={handleCancel}
                        >
                          Não
                        </button>
                      </div>
                    </>
                  )}
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
