import { useEffect, useState } from 'react';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import './BookList.css';
import coverImg from '../../../src/images/cover_not_found.jpg';

const Book = ({ id, title, author, cover, userId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchCoverImage = async () => {
      try {
        if (cover) {
          const binaryString = cover.data.reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          );
          const base64Image = btoa(binaryString);
          setImageUrl(`data:image/jpeg;base64,${base64Image}`);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao buscar a imagem do livro:', error);
        setIsLoading(false);
      }
    };
  
    fetchCoverImage();
  }, [cover]);
 
  useEffect(() => {
    const fetchFavoriteStatus = () => {
      const favoritesByUser = JSON.parse(localStorage.getItem('favoritesByUser')) || {};

      // Verifique se o usuário possui uma lista de favoritos
      if (favoritesByUser[userId]) {
        const userFavorites = favoritesByUser[userId];
        const isBookInFavorites = userFavorites.some((favBook) => favBook.id === id);
        setIsFavorite(isBookInFavorites);
      }
    };

    fetchFavoriteStatus();
  }, [id, userId]);

  const handleFavoriteClick = () => {
    const favoritesByUser = JSON.parse(localStorage.getItem('favoritesByUser')) || {};

    if (!favoritesByUser[userId]) {
      favoritesByUser[userId] = [];
    }

    const userFavorites = favoritesByUser[userId];
    const isBookInFavorites = userFavorites.some((favBook) => favBook.id === id);

    if (isBookInFavorites) {
      const updatedFavorites = userFavorites.filter((favBook) => favBook.id !== id);
      favoritesByUser[userId] = updatedFavorites;
      setIsFavorite(false);
    } else {
      const updatedFavorites = [...userFavorites, { id, title, author, cover }];
      favoritesByUser[userId] = updatedFavorites;
      setIsFavorite(true);
    }

    localStorage.setItem('favoritesByUser', JSON.stringify(favoritesByUser));
  };

  return (
    <div className='book-item flex flex-column flex-sb'>
      <div className='book-item-img'>
        {isLoading ? (
          <div className='book-item-loading'>Carregando...</div>
        ) : (
          <img src={imageUrl ? imageUrl : coverImg} alt='Capa' />
        )}
      </div>
      <div className='book-item-info text-center'>
        <div className='book-item-info-item title fw-7 fs-18'>
          <span>{title}</span>
          <span className="favorite-icon" onClick={handleFavoriteClick}>
            {isFavorite ? (
              <AiFillStar className="star-icon1" />
            ) : (
              <AiOutlineStar className="star-icon2" />
            )}
          </span>
        </div>
        <div className='book-item-info-item author fs-15'>
          <span className='text-capitalize fw-7'>Autor: </span>
          <span>{author}</span>
        </div>
      </div>
    </div>
  );
};

export default Book;