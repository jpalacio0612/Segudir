import React from "react";
import "./Header.css";
import segudirLogo from "../../assets/segudir.png";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div className="header">
      <div className="header__container">
        <div className="header__nav">
          <div className="header__logo">
            <Link to="/">
              <img src={segudirLogo} alt="Logo segudir" />
            </Link>
            <Link to="/">
              <span>SEGUDIR</span>
            </Link>
          </div>
          <ul>
            <li>
              <Link to="/">Cursos</Link>
            </li>
            <li>
              <Link to="/">Precios</Link>
            </li>
            <li>
              <Link to="/">Blog</Link>
            </li>
            <li>
              <Link to="/">¿Quieres ser un mentor?</Link>
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
    </div>
  );
};
