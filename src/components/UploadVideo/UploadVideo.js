import React, { useState } from "react";
import "./UploadVideo.css";
import playIcon from "../../assets/play-icon.svg";
import likeIcon from "../../assets/like.svg";
import dislikeIcon from "../../assets/dislike.svg";
import { db, storage } from "../../firebase";
import firebase from "firebase";
import { useSelector } from "react-redux";

export const UploadVideo = () => {
  const reduxState = useSelector(({ state }) => state);
  const [title, setTitle] = useState("Titulo");
  const [description, setDescription] = useState("Descripcion");
  const [miniature, setMiniature] = useState("");
  const [video, setVideo] = useState();
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState("");

  const imageHandleChange = (event) => {
    if (event.target.files[0]) {
      setMiniature(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    }
  };

  const videoHandleChange = (event) => {
    if (event.target.files[0]) {
      setVideo(event.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    const authUser = reduxState;
    console.log("ser", authUser);
    let urlImage = "";
    e.preventDefault();
    let uploadTask = storage
      .ref(`${authUser.email}/${title}/miniature/${image.name}`)
      .put(image);
    await uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref(`${authUser.email}/${title}/miniature/`)
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            urlImage = url;
            setProgress(0);
            setImage(null);
          });
      }
    );
    uploadTask = storage
      .ref(`${authUser.email}/${title}/video/${video.name}`)
      .put(video);
    await uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref(`${authUser.email}/${title}/video/`)
          .child(video.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("media").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              imageUrl: urlImage,
              videoUrl: url,
              mentorId: authUser.id,
              mentorName: `${authUser.name} ${authUser.lastName}`,
              title: title,
              description: description,
            });
            setProgress(0);
            setVideo(null);
          });
      }
    );
  };

  return (
    <div className="uploadvideo">
      <div className="course">
        <div className="course__top">
          <img src={miniature} className="course__top--miniature" alt="" />
          <img
            className="course__top--playicon"
            src={playIcon}
            alt="play button"
          />
        </div>
        <div className="course__bottom">
          <h2>{title}</h2>
          <p>{description}</p>
          <div className="course__bottom--rating">
            <img src={likeIcon} alt="like icon" />
            <span>0</span>
            <img src={dislikeIcon} alt="dislike icon" />
            <span>0</span>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Titulo"
          onChange={(e) => setTitle(e.target.value)}
          required={true}
        />
        <input
          placeholder="Descripción"
          onChange={(e) => setDescription(e.target.value)}
          required={true}
        />
        <input
          type="file"
          accept="image/*"
          onChange={imageHandleChange}
          required={true}
        />
        <input
          type="file"
          accept="video/*"
          required={true}
          onChange={videoHandleChange}
        />
        <button>Subir video</button>
      </form>
      <progress className="imageupload__progress" value={progress} max="100" />
    </div>
  );
};
