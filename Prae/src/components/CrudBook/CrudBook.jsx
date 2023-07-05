import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./CrudBook.css";
import Header from "../Header/Header";
import coverImg from "../../../src/images/cover_not_found.jpg";

const categories = [1, 2, 3, 4, 5, 6];

const CrudBook = () => {
  const [books, setBooks] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    category: "",
    cover: null,
    quantity: 0,
  });

  const [bookDataModal, setBookDataModal] = useState({
    title: "",
    author: "",
    category: "",
    cover: null,
    quantity: 0,
  });

  const [selectedBook, setSelectedBook] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const imageInputRef = useRef(null);
  const searchText = useRef("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        "https://prae-backend-projeto.herokuapp.com/books/all"
      );
      const booksWithImageUrl = response.data.books.map((book) => {
        if (book.cover) {
          const binaryString = book.cover.data.reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          );
          const base64Image = btoa(binaryString);
          book.imageUrl = `data:image/jpeg;base64,${base64Image}`;
        } else {
          book.imageUrl = coverImg;
        }
        return book;
      });
      setBooks(booksWithImageUrl);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleModalInputChange = (e) => {
    const { name, value } = e.target;
    setBookDataModal((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setBookData((prevData) => ({
      ...prevData,
      cover: file,
    }));
  };

  const handleImageModalUpload = (e) => {
    const file = e.target.files[0];
    setBookDataModal((prevData) => ({
      ...prevData,
      cover: file,
    }));
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const handleBookDelete = (book) => {
    setSelectedBook(book);
  };

  const handleEditBook = () => {
    setShowConfirmation(true);
  };

  const handleDeleteBook = (book) => {
    setBookData(book);
    setShowDeleteModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", bookData.title);
      formData.append("author", bookData.author);
      formData.append("category", bookData.category);
      formData.append("cover", bookData.cover);
      formData.append("quantity", bookData.quantity);

      await axios.post(
        "https://prae-backend-projeto.herokuapp.com/books",
        formData
      );

      setBookData({
        title: "",
        author: "",
        category: "",
        cover: null,
        quantity: 0,
      });
      imageInputRef.current.value = null;
      fetchBooks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditConfirmed = async () => {
    try {
      const formData = new FormData();
      formData.append("title", bookDataModal.title);
      formData.append("author", bookDataModal.author);
      formData.append("category", bookDataModal.category);
      formData.append("cover", bookDataModal.cover);
      formData.append("quantity", bookDataModal.quantity);

      await axios.put(
        `https://prae-backend-projeto.herokuapp.com/books/${selectedBook.id}`,
        formData
      );

      setBookDataModal({
        title: "",
        author: "",
        category: "",
        cover: null,
        quantity: 0,
      });
      imageInputRef.current.value = null;
      fetchBooks();
      setShowConfirmation(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteConfirmed = async (book) => {
    try {
      await axios.delete(
        `https://prae-backend-projeto.herokuapp.com/books/${book.id}`
      );
      setShowDeleteModal(false);
      fetchBooks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(null);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `https://prae-backend-projeto.herokuapp.com/books?title=${searchText.current.value}`
      );
      setBooks(response.data.books);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <div className="crud-container">
        <div className="crud-container1">
          <h1>CRUD de Livros</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Título do Livro:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={bookData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="author">Autor:</label>
              <input
                type="text"
                id="author"
                name="author"
                value={bookData.author}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Categoria:</label>
              <select
                id="category"
                name="category"
                value={bookData.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecione uma categoria</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    Categoria {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="quantity">Quantidade:</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={bookData.quantity}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="cover">Imagem da Capa:</label>
              <input
                type="file"
                id="cover"
                className="upload"
                name="cover"
                accept="image/*"
                onChange={handleImageUpload}
                ref={imageInputRef}
              />
            </div>
            <button className="buttonCrud" type="submit">
              Salvar
            </button>
          </form>
        </div>
        <div className="crud-container2">
          <div className="booklist-content grid">
            {books.map((book) => (
              <div key={book.id} className="book-info">
                <h3>{book.title}</h3>
                <p>Autor: {book.author}</p>
                <div className="imgBook">
                  {book.imageUrl && (
                    <img src={book.imageUrl} alt="Capa do Livro" />
                  )}
                </div>
                <p>Categoria: {book.category}</p>
                <p>Quantidade: {book.quantity}</p>
                <div className="containerbuttonsDetailDel">
                  <button
                    className="buttonsDetailDel"
                    onClick={() => handleBookClick(book)}
                  >
                    Detalhes
                  </button>
                  <button
                    className="buttonsDetailDel"
                    onClick={() => handleDeleteBook(book)}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {selectedBook && (
          <div className="modal">
            <div className="modal-content">
              <h3>{selectedBook.title}</h3>
              <div className="form-group">
                <label htmlFor="modal-title">Título do Livro:</label>
                <input
                  type="text"
                  id="modal-title"
                  name="title"
                  value={bookDataModal.title}
                  onChange={handleModalInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="modal-author">Autor:</label>
                <input
                  type="text"
                  id="modal-author"
                  name="author"
                  value={bookDataModal.author}
                  onChange={handleModalInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="modal-category">Categoria:</label>
                <select
                  id="modal-category"
                  name="category"
                  value={bookDataModal.category}
                  onChange={handleModalInputChange}
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      Categoria {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="modal-quantity">Quantidade:</label>
                <input
                  type="number"
                  id="modal-quantity"
                  name="quantity"
                  value={bookDataModal.quantity}
                  onChange={handleModalInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="cover">Imagem da Capa:</label>
                <input
                  type="file"
                  id="cover"
                  name="cover"
                  accept="image/*"
                  onChange={handleImageModalUpload}
                  ref={imageInputRef}
                />
              </div>
              <div className="modal-buttons">
                <button className="buttonsSaveClose" onClick={handleCloseModal}>
                  Fechar
                </button>
                <button
                  className="buttonsSaveClose"
                  onClick={handleEditConfirmed}
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        )}
        {showDeleteModal && (
          <div className="modal">
            <div className="modal-content">
              <h3>Confirmação de Exclusão</h3>
              <p>Deseja realmente excluir o livro?</p>
              <div className="modal-buttons">
                <button
                  className="buttonsSaveClose"
                  onClick={handleCloseDeleteModal}
                >
                  Fechar
                </button>
                <button
                  className="buttonsSaveClose"
                  onClick={() => handleDeleteConfirmed(bookData)}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CrudBook;
