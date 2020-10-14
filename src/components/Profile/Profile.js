import React, { useEffect, useState } from "react";
import "./Profile.css";
import avatar_icon from "../../assets/img_avatar.png";
import black_pencil from "../../assets/black_pencil.png";
import { useSelector } from "react-redux";
import { UploadVideo } from "../UploadVideo/UploadVideo";
import { Modal } from "../Modal/Modal";

export const Profile = () => {
  const [tag, setTag] = useState("profile");
  const [modelToggle, setModelToggle] = useState(false);
  const [authUser, setAuthUser] = useState({});
  const reduxState = useSelector(({ state }) => state);

  useEffect(() => {
    setAuthUser(reduxState ? reduxState : {});
  }, [reduxState]);

  const handleClose = () => setModelToggle(false);

  return (
    <div className="profile">
      <div className="profile__grid">
        <div className="profile__selector">
          <span
            className={tag === "profile" ? "tag__selected" : "tag__unselected"}
            onClick={() => setTag("profile")}
          >
            Perfil
          </span>
          <span
            className={tag === "courses" ? "tag__selected" : "tag__unselected"}
            onClick={() => setTag("courses")}
          >
            Mis cursos
          </span>
        </div>
        <div className="profile__notification">
          <span>Notificaciones</span>
        </div>
        <div className="profile__content">
          <div className="profile__content--top">
            <img src={authUser.picture || avatar_icon} alt="avatar" />
          </div>
          {tag === "profile" && (
            <div className="profile__content--bottom">
              <div className="profile__content--bottom--fields">
                <div className="profile__content--field">
                  <input placeholder={authUser.name || "Nombres"} />
                  <img src={black_pencil} alt="edit" />
                </div>
                <div className="profile__content--field">
                  <input placeholder={authUser.lastName || "Apellidos"} />
                  <img src={black_pencil} alt="edit" />
                </div>
                <div className="profile__content--field">
                  <input placeholder={authUser.phone || "Telefono"} />
                  <img src={black_pencil} alt="edit" />
                </div>
                <div className="profile__content--field">
                  <input placeholder="Contraseña" />
                  <img src={black_pencil} alt="edit" />
                </div>
              </div>
            </div>
          )}
          {tag === "courses" && (
            <>
              <button onClick={() => setModelToggle(true)}>Subir video</button>
              <Modal show={modelToggle} modalClosed={handleClose}>
                <UploadVideo />
              </Modal>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
