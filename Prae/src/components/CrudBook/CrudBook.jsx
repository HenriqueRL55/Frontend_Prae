import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './CrudBook.css';

const categories = ['Categoria 1', 'Categoria 2', 'Categoria 3', 'Categoria 4', 'Categoria 5', 'Categoria 6'];

const CrudBook = () => {
  const [books, setBooks] = useState([]);
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    category: '',
    cover: null,
    quantity: 0,
  });

  const [selectedBook, setSelectedBook] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const imageInputRef = useRef(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('https://prae-backend-projeto.herokuapp.com/books/all');
      setBooks(response.data.books);
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setBookData((prevData) => ({
      ...prevData,
      cover: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', bookData.title);
      formData.append('author', bookData.author);
      formData.append('category', bookData.category);
      formData.append('cover', bookData.cover);
      formData.append('quantity', bookData.quantity);

      await axios.post('https://prae-backend-projeto.herokuapp.com/books', formData);

      setBookData({
        title: '',
        author: '',
        category: '',
        cover: null,
        quantity: 0,
      });
      imageInputRef.current.value = null;
      fetchBooks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const handleDeleteBook = async (book) => {
    try {
      await axios.delete(`https://prae-backend-projeto.herokuapp.com/books/${book.id}`);
      fetchBooks();
      setSelectedBook(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditBook = () => {
    setShowConfirmation(true);
  };

  const handleEditConfirmed = async () => {
    try {
      const formData = new FormData();
      formData.append('title', bookData.title);
      formData.append('author', bookData.author);
      formData.append('category', bookData.category);
      formData.append('cover', bookData.cover);
      formData.append('quantity', bookData.quantity);

      await axios.put(`https://prae-backend-projeto.herokuapp.com/books/${selectedBook.id}`, formData);

      setBookData({
        title: '',
        author: '',
        category: '',
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

  const handleCloseModal = () => {
    setSelectedBook(null);
    setShowConfirmation(false);
  };

  return (
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
                  {category}
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
          {/* <div className="form-group">
            <label htmlFor="cover">Imagem da Capa:</label>
            <input
              type="file"
              id="cover"
              name="cover"
              accept="image/*"
              onChange={handleImageUpload}
              ref={imageInputRef}
              required
            />
          </div> */}
          <button className="buttonCrud" type="submit">Salvar</button>
        </form>
      </div>
      <div className="crud-container2">
        {books.map((book) => (
          <div key={book.id} className="book-info">
            <h3>{book.title}</h3>
            <p>Autor: {book.author}</p>
            <img src={book.cover} alt="Capa do Livro" />
            <p>Categoria: {book.category}</p>
            <p>Quantidade: {book.quantity}</p>
            <button onClick={() => handleBookClick(book)}>Detalhes</button>
            <button onClick={() => handleDeleteBook(book)}>Excluir</button>
          </div>
        ))}
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
                value={bookData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="modal-author">Autor:</label>
              <input
                type="text"
                id="modal-author"
                name="author"
                value={bookData.author}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="modal-category">Categoria:</label>
              <select
                id="modal-category"
                name="category"
                value={bookData.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecione uma categoria</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
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
                value={bookData.quantity}
                onChange={handleInputChange}
                required
              />
            </div>
            {/* <div className="form-group">
              <label htmlFor="modal-cover">Imagem da Capa:</label>
              <input
                type="file"
                id="modal-cover"
                name="cover"
                accept="image/*"
                onChange={handleImageUpload}
                ref={imageInputRef}
                required
              />
            </div> */}
            <button className="buttonCrud" onClick={handleEditBook}>Editar</button>
            <button className="buttonCrud" onClick={handleCloseModal}>Fechar</button>
          </div>
        </div>
      )}

      {showConfirmation && (
        <div className="modal">
          <div className="modal-content">
            <h3>Confirmação</h3>
            <p>Deseja salvar as alterações feitas?</p>
            <button className="buttonCrud" onClick={handleEditConfirmed}>Salvar</button>
            <button className="buttonCrud" onClick={handleCloseModal}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrudBook;
