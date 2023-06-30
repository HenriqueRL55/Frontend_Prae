import React from 'react';
import "./About.css";
import aboutImg from "../../images/about-img.jpg";
import Header from '../../../src/components/Header/Header';

const About = () => {
  return (
  <>
    <Header />
    <section className='about'>
      
      <div className='container'>
        <div className='section-title'>
          <h2>Sobre</h2>
        </div>

        <div className='about-content grid'>
          <div className='about-img'>
            <img src = {aboutImg} alt = "" />
          </div>
          <div className='about-text'>
            <h2 className='about-title fs-26 ls-1'>Sobre a PRAE</h2>
            <p className='fs-17'>A Pró-Reitoria de Assuntos Estudantis (PRAE) é o órgão administrativo da UFSM que planeja, operacionaliza, supervisiona, orienta e, juntamente com os acadêmicos, interage nas atividades universitárias que abrangem o campo cultural, social e assistencial da Política de Assistência Estudantil da Universidade Federal de Santa Maria. A PRAE localiza-se no terceiro andar do prédio 48-D, no Campus Sede. </p>     
          </div>
        </div>
      </div>
    </section>
  </>
  )
  
}

export default About
