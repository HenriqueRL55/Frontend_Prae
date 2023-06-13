import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./BookList.css";

const Book = (book) => {
  const [coverImg, setCoverImg] = useState('');

  useEffect(() => {
    const fetchCoverImage = async () => {
      try {
        const imageUrl = `https://prae-backend-projeto.herokuapp.com/showImage/${book.cover}`;
        setCoverImg(imageUrl);
      
      } catch (error) {
        console.error('Erro ao buscar a imagem do livro:', error);
      }
    };

    fetchCoverImage();
  }, [book.id]);

  return (
    <div className='book-item flex flex-column flex-sb'>
      <div className='book-item-img'>
        <img src={coverImg} alt="cover" />
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
