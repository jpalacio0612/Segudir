import React, { useEffect, useState } from "react";
import "./Header.css";
import segudirLogo from "../../assets/segudir.png";
import defaultAvatar from "../../assets/img_avatar.png";
import menuIcon from "../../assets/menu.svg";
import { Link, useHistory } from "react-router-dom";
import { auth, db } from "../../firebase";
import { useDispatch } from "react-redux";
import { saveAuthUserAction } from "../../redux/actions/saveAuthUserAction";

export const Header = () => {
  const history = useHistory();
  const [authUser, setAuthUser] = useState();
  const [avatar, setAvatar] = useState(defaultAvatar);
  const [burgerHide, setBurgerHide] = useState(true);
  const dispatch = useDispatch();

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
      let docRef = db.collection("students").doc(authUser.uid);
      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            const data = doc.data();
            dispatch(saveAuthUserAction({ ...data, isAuth: true }));
            data.picture ? setAvatar(data.picture) : setAvatar(defaultAvatar);
          } else {
            docRef = db.collection("mentors").doc(authUser.uid);
            docRef.get().then((doc) => {
              if (doc.exists) {
                const data = doc.data();
                dispatch(saveAuthUserAction({ ...data, isAuth: true }));
                data.picture
                  ? setAvatar(data.picture)
                  : setAvatar(defaultAvatar);
              } else {
                console.log("Document not found");
              }
            });
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    }
  }, [authUser, dispatch]);

  const logout = () => {
    auth.signOut().then(history.push("/"));
    dispatch(saveAuthUserAction({ isAuth: false }));
    setBurgerHide(true);
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
              <Link to="/signup/mentor">¿Quieres ser un mentor?</Link>
            </li>
          </ul>
        </div>

        {authUser ? (
          <div className="dropdown">
            <div
              className={
                burgerHide ? "avatar__container" : "avatar__container--white"
              }
              onMouseEnter={() => setBurgerHide(true)}
              onClick={() => setBurgerHide(true)}
            >
              <img className="avatar" src={avatar} alt="avatar" />
            </div>
            <div
              className={
                burgerHide ? "dropdown__content" : "dropdown__content--hide"
              }
              onClick={() => setBurgerHide(false)}
            >
              <Link to="">Perfil</Link>
              <Link to="/courses">Cursos</Link>
              <Link to="">Precios</Link>
              <Link to="">Blog</Link>
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
                <Link to="/signup/student">Registrate</Link>
              </li>
            </ul>
            <div className="burger--dropdown">
              <div
                className={
                  burgerHide ? "avatar__container" : "avatar__container--white"
                }
                onMouseEnter={() => setBurgerHide(true)}
                onClick={() => setBurgerHide(true)}
              >
                <img className="avatar" src={menuIcon} alt="avatar" />
              </div>
              <div
                onClick={() => setBurgerHide(false)}
                className={
                  burgerHide ? "dropdown__content" : "dropdown__content--hide"
                }
              >
                <Link to="/courses">Cursos</Link>
                <Link to="">Precios</Link>
                <Link to="">Blog</Link>
                <Link to="/signup/mentor">¿Quieres ser un mentor?</Link>
                <Link to="/signin">Ingresar</Link>
                <Link to="/signup">Registrarte</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
