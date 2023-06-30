import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './BookList.css';
import coverImg from '../../../src/images/cover_not_found.jpg';

const Book = (book) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchCoverImage = async () => {
      try {
        const imageUrl = `https://prae-backend-projeto.herokuapp.com/showImage/${book.cover}`;
        await axios.get(imageUrl); // Preload the image
        setImageUrl(imageUrl);
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao buscar a imagem do livro:', error);
        setIsLoading(false);
      }
    };

    fetchCoverImage();
  }, [book.cover]);

  return (
    <div className='book-item flex flex-column flex-sb'>
      <div className='book-item-img'>
        {isLoading ? (
          <div className='book-item-loading'>Carregando...</div>
        ) : (
          <img src={imageUrl || coverImg} alt='Capa' />
        )}
      </div>
      <div className='book-item-info text-center'>
        <Link to={`/book/${book.id}`} {...book}>
          <div className='book-item-info-item title fw-7 fs-18'>
            <span>{book.title}</span>
          </div>
        </Link>
        <div className='book-item-info-item author fs-15'>
          <span className='text-capitalize fw-7'>Autor: </span>
          <span>{book.author}</span>
        </div>
      </div>
    </div>
  );
};

export default Book;
