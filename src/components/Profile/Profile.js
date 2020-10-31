import React, { useEffect, useState } from "react";
import "./Profile.css";
import avatar_icon from "../../assets/img_avatar.png";
import black_pencil from "../../assets/black_pencil.png";
import { useSelector } from "react-redux";
import { UploadVideo } from "../UploadVideo/UploadVideo";
import { db } from "../../firebase";
import { CourseCard } from "../CourseCard/CourseCard";
import Modal from "@material-ui/core/Modal";
import { Link } from "react-router-dom";

export const Profile = () => {
  const [tag, setTag] = useState("profile");
  const [media, setMedia] = useState([]);
  const authUser = useSelector(({ state }) => state);
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState();

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (authUser) {
      const mediaArray = [];
      db.collection("media")
        .orderBy("timestamp", "desc")
        .where("mentorId", "==", authUser["id"] || "")
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            mediaArray.push({ ...doc.data(), mediaId: doc.id });
          });
        })
        .catch((error) => console.log(error));
      setMedia(mediaArray);
    }
  }, [authUser]);

  useEffect(() => {
    if (authUser) {
      const notificationArray = [];
      db.collection("media")
        .orderBy("timestamp", "desc")
        .where("mentorId", "==", authUser["id"] || "")
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            let comment = doc.data();
            const mediaId = doc.id;
            console.log(mediaId);
            let unsubscribe = db
              .collection("media")
              .doc(doc.id)
              .collection("comments")
              .orderBy("timestamp", "desc")
              .onSnapshot((snapshot) => {
                snapshot.docs.map((doc) => {
                  console.log(comment);
                  notificationArray.push({
                    ...doc.data(),
                    title: comment.title,
                    mediaId: mediaId,
                    ...comment,
                  });
                });
                setNotifications(notificationArray);
              });
          });
        })
        .catch((error) => console.log(error));
    }
  }, [authUser]);

  return (
    <div className="profile">
      {authUser && (
        <div className="profile__grid">
          <div className="profile__selector">
            <span
              className={
                tag === "profile" ? "tag__selected" : "tag__unselected"
              }
              onClick={() => setTag("profile")}
            >
              Perfil
            </span>
            <span
              className={
                tag === "courses" ? "tag__selected" : "tag__unselected"
              }
              onClick={() => setTag("courses")}
            >
              Mis cursos
            </span>
          </div>
          <div className="profile__notification">
            <span>Notificaciones</span>
            {notifications &&
              notifications.map((notification) => (
                <Link
                  to={{ pathname: "/videoplayer", course: notification }}
                  className="notification"
                >
                  <div className="notification">
                    <h3>{notification.title}</h3>
                    <h4>{notification["username"]}</h4>
                    <p>{notification["text"]}</p>
                  </div>
                </Link>
              ))}
          </div>
          <div className="profile__content">
            <div className="profile__content--top">
              <img src={authUser["picture"] || avatar_icon} alt="avatar" />
            </div>
            {tag === "profile" && (
              <div className="profile__content--bottom">
                <div className="profile__content--bottom--fields">
                  <div className="profile__content--field">
                    <input placeholder={authUser["name"] || "Nombres"} />
                    <img src={black_pencil} alt="edit" />
                  </div>
                  <div className="profile__content--field">
                    <input placeholder={authUser["lastname"] || "Apellidos"} />
                    <img src={black_pencil} alt="edit" />
                  </div>
                  <div className="profile__content--field">
                    <input placeholder={authUser["phone"] || "Telefono"} />
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
              <div className="profile__courses">
                <button
                  className="upload__button"
                  onClick={() => setOpen(true)}
                >
                  Subir video
                </button>
                <div className="mycourses">
                  <div className="mycourses__grid">
                    {media.map((course) => (
                      <CourseCard
                        course={course}
                        authUser={authUser}
                        key={course.mediaId}
                      />
                    ))}
                  </div>
                </div>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                  <UploadVideo modalClosed={handleClose} />
                </Modal>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
