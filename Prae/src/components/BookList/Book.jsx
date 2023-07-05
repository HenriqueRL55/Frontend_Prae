import { useEffect, useState } from 'react';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import './BookList.css';
import coverImg from '../../../src/images/cover_not_found.jpg';
import axios from 'axios';
import { useContext } from 'react';
import { AppContext } from '../../auth/context';

const Book = ({ id, title, author, cover }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const { user } = useContext(AppContext);

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
        } else {
          setImageUrl(coverImg);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao buscar a imagem do livro:', error);
        setIsLoading(false);
      }
    };

    fetchCoverImage();
  }, [cover]);

  const handleFavoriteClick = async () => {
    try {
      const userId = user.id;
      const bookId = id;
      const url = `https://prae-backend-projeto.herokuapp.com/interests/`;

      if (isFavorite) {
        // Se o livro já está marcado como favorito, exclua-o dos favoritos
        await axios.delete(url, { data: { user_id: userId, book_id: bookId } });
        setIsFavorite(false);
      } else {
        // Se o livro não está marcado como favorito, adicione-o aos favoritos
        const status = 0; // Defina o status aqui
        await axios.post(url, { user_id: userId, book_id: bookId, status });
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Erro ao salvar ou excluir o livro dos favoritos:", error);
    }
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
              <AiFillStar className="star-icon2" />
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
