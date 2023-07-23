import { useEffect, useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import "./BookList.css";
import coverImg from "../../../src/images/cover_not_found.jpg";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../../auth/context";

const Book = ({ id, title, author, cover, userName, onClick }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const { user } = useContext(AppContext);

  useEffect(() => {
    const fetchCoverImage = async () => {
      try {
        if (cover) {
          const binaryString = cover.data.reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          );
          const base64Image = btoa(binaryString);
          setImageUrl(`data:image/jpeg;base64,${base64Image}`);
        } else {
          setImageUrl(coverImg);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar a imagem do livro:", error);
        setIsLoading(false);
      }
    };

    fetchCoverImage();
  }, [cover]);

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      try {
        // Use a URL correta da API para buscar todos os interesses
        const url = `https://prae-backend-projeto.herokuapp.com/interests/all`;
        const response = await axios.get(url);
  
        // Acesse a propriedade "interests" da resposta da API
        const allInterests = response.data.interests;
  
        // Filtre os resultados para retornar apenas os interesses do usuário logado
        const userInterests = allInterests.filter(
          (interest) => interest.user_id === user.id
        );
  
        // Verifique se o livro atual está na lista de interesses do usuário
        const isBookFavorite = userInterests.some(
          (interest) => interest.book_id === id
        );
  
        setIsFavorite(isBookFavorite);
      } catch (error) {
        console.error("Erro ao buscar o status de favorito do livro:", error);
      }
    };
  
    fetchFavoriteStatus();
  }, [id, user.id]);
  
  
  
  const handleFavoriteClick = async () => {
    try {
      const userId = user.id;
      const bookId = id;
  
      if (isFavorite) {
        // Se o livro já está marcado como favorito, exclua-o dos favoritos
        // Busque todos os interesses do usuário
        const allInterestsUrl = `https://prae-backend-projeto.herokuapp.com/interests/all`;
        const allInterestsResponse = await axios.get(allInterestsUrl);
        const allInterests = allInterestsResponse.data.interests;
  
        // Encontre o interesse correspondente ao livro atual
        const interest = allInterests.find(
          (interest) => interest.user_id === userId && interest.book_id === bookId
        );
  
        if (interest) {
          // Se o interesse for encontrado, exclua-o
          const url = `https://prae-backend-projeto.herokuapp.com/interests/${interest.id}`;
          await axios.delete(url);
          setIsFavorite(false);
        } else {
          console.error("Erro: interesse não encontrado");
        }
      } else {
        // Se o livro não está marcado como favorito, adicione-o aos favoritos
        // Substitua esta URL pela URL correta da API para adicionar um interesse
        const url = `https://prae-backend-projeto.herokuapp.com/interests/`;
        const status = 0; // Defina o status aqui
        await axios.post(url, { user_id: userId, book_id: bookId, status });
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Erro ao salvar ou excluir o livro dos favoritos:", error);
    }
  };
  
  

  return (
    <div className="book-item flex flex-column flex-sb" onClick={onClick}>
      <div className="book-item-img">
        {isLoading ? (
          <div className="book-item-loading">Carregando...</div>
        ) : (
          <img src={imageUrl ? imageUrl : coverImg} alt="Capa" />
        )}
      </div>
      <div className="book-item-info text-center">
        <div className="book-item-info-item title fw-7 fs-18">
          <span>{title}</span>
          {user.type === 1 ? null : (
          <span className="favorite-icon" onClick={handleFavoriteClick}>
          {isFavorite ? (
            <AiFillStar className="star-icon1" />
          ) : (
            <AiFillStar className="star-icon2" />
          )}
        </span>
          )}
        </div>
        <div className="book-item-info-item author fs-15">
          <span className="text-capitalize fw-7">Autor: </span>
          <span>{author}</span>
        </div>
      </div>
    </div>
  );
};

export default Book;
