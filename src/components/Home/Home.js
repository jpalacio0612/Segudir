import React from 'react'
import homeImage from '../../assets/hero.jpg'
import './Home.css'

export const Home = () => {
  return (
    <div className="home">
      <div className="hero">
        <div className="hero__left">
          <h1>Cursos online <br/> Seguridad Electronica</h1>
          <p>Inicia sin limites y tu trabajo sera mejor <br/> mañana</p>
          <button>Comienza ahora</button>
        </div>
        <div className="hero__right">
          <img src={homeImage} alt="Security cameras"/>
        </div>
      </div>
      <section class="carousel">
        <span>Ultimos Cursos</span>
      <div class="carousel__container">
        <div class="carousel__item">
          
        </div>
        <div class="carousel__item">
        
        </div>
        <div class="carousel__item">
       
        </div>
        <div class="carousel__item">
          
        </div>
        
      </div>
    </section>
    </div>
  )
}
