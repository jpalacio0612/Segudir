import React from 'react'
import './Header.css'
import segudirLogo from '../../assets/segudir.png'
import { Link } from 'react-router-dom'


export const Header = () => {
  return (
    <div className="header">
      <div className="header__nav">
        <Link to="/">
         <img src={segudirLogo} alt="Logo segudir"/>
        </Link>
        <Link to="/">
          <span>SEGUDIR</span>
        </Link>        
        <ul>
          <li>
            <Link href="/">Cursos</Link>
          </li>
          <li>
            <Link href="/">Precios</Link>
          </li>
          <li>
            <Link href="/">Blog</Link>
          </li>
          <li>
            <Link href="/">¿Quieres ser un mentor?</Link>
          </li>
        </ul>
      </div>
      <div className="header__sign">
        <ul>
          <li>
            <Link to="/signin">Ingresar</Link>
          </li>
          <li>
            <Link to="/signup">Registrate</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
