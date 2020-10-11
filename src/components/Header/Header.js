import React, { useEffect, useState } from "react";
import "./Header.css";
import segudirLogo from "../../assets/segudir.png";
import defaultAvatar from "../../assets/img_avatar.png";
import { Link, useHistory } from "react-router-dom";
import { auth, db } from "../../firebase";

export const Header = () => {
  const history = useHistory();
  const [authUser, setAuthUser] = useState();
  const [avatar, setAvatar] = useState(defaultAvatar);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setAuthUser(authUser);
      } else {
        setAuthUser();
      }
    });
  }, [authUser]);

  useEffect(() => {
    if (authUser) {
      const docRef = db.collection("students").doc(authUser.uid);
      docRef
        .get()
        .then(function (doc) {
          if (doc.exists) {
            const data = doc.data();
            data.picture ? setAvatar(data.picture) : setAvatar(defaultAvatar);
          } else {
            console.log("No such document!");
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    }
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

        {authUser ? (
          <div className="dropdown">
            <div className="avatar__container">
              <img className="avatar" src={avatar} alt="avatar" />
            </div>
            <div className="dropdown__content">
              <Link to="">Perfil</Link>
              <Link onClick={logout} to="">
                Cerrar Sesión
              </Link>
            </div>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};
