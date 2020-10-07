import React from 'react'
import './Header.css'
import segudirLogo from '../../assets/segudir.png'

export const Header = () => {
  return (
    <div className="header">
      <div className="header__nav">
        <img src={segudirLogo} alt="Logo segudir"/>
        <span>SEGUDIR</span>
        <ul>
          <li>
            <a href="/">Cursos</a>
          </li>
          <li>
            <a href="/">Precios</a>
          </li>
          <li>
            <a href="/">Blog</a>
          </li>
          <li>
            <a href="/">¿Quieres ser un mentor?</a>
          </li>
        </ul>
      </div>
      <div className="header__sign">
        <ul>
          <li>
            <a href="/">Ingresar</a>
          </li>
          <li>
            <a href="/">Registrate</a>
          </li>
        </ul>
      </div>
    </div>
  )
}
