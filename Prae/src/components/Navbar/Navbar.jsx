import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Navbar.css";
import logoImg from "../../images/logo.png";
import { GrLogout } from "react-icons/gr";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

const user = JSON.parse(localStorage.getItem('user'));

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const navigate = useNavigate();
  const handleNavbar = () => setToggleMenu(!toggleMenu);

  const handleLogout = () => {
    // Limpar os dados do usuário, encerrar a sessão, etc.
    // Exemplo: remover o token de autenticação do localStorage
    localStorage.removeItem('token');

    // Redirecionar o usuário para a página de login
    navigate('/');
  };

  return (
    <>
      <nav className='navbar' id="navbar">
        <div className='container navbar-content flex'>
          <div className='brand-and-toggler flex flex-sb'>
            <div to="/" className='navbar-brand flex'>
              <img src={logoImg} alt="site logo" />
              <span className='text-uppercase fw-7 fs-24 ls-1'>SATIE</span>
            </div>
            <button type="button" className='navbar-toggler-btn' onClick={handleNavbar}>
              <HiOutlineMenuAlt3 size={35} style={{
                color: `${toggleMenu ? "#fff" : "#010101"}`
              }} />
            </button>
          </div>
          <div className={toggleMenu ? "navbar-collapse show-navbar-collapse" : "navbar-collapse"}>
            <ul className="navbar-nav">
              <li className='nav-item'>
                <Link to="/book" className='nav-link text-uppercase text-white fs-22 fw-6 ls-1'>Acervo</Link>
              </li>
              <li className='nav-item'>
                <Link to="/about" className='nav-link text-uppercase text-white fs-22 fw-6 ls-1'>Sobre Nós</Link>
              </li>
              {user.type === 1 && (
              <li className='nav-item'>
                <Link to="/crudBook" className='nav-link text-uppercase text-white fs-22 fw-6 ls-1'>Cadastro</Link>
              </li>
              )}
              <li className='nav-item'>
                <Link to="/favorites" className='nav-link text-uppercase text-white fs-22 fw-6 ls-1'>Interesses</Link>
              </li>
              <li className='nav-item'>
                <button className='nav-link text-uppercase text-white fs-22 fw-6 ls-1' onClick={handleLogout}><GrLogout /></button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar;
