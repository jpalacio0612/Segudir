import React, { useEffect, useState } from "react";
import "./Header.css";
import segudirLogo from "../../assets/segudir.png";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../firebase";

export const Header = () => {
  const history = useHistory();
  const [authUser, setAuthUser] = useState();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setAuthUser(authUser);
      } else {
        setAuthUser();
      }
    });
  }, [authUser]);

  const logout = () => {
    auth.signOut().then(history.push("/"));
  };

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
              <Link to="/courses">Cursos</Link>
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
          {authUser && <button onClick={logout}>Cerrar Sesión</button>}
        </div>
      </div>
    </div>
  );
};
