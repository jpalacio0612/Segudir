import React, { useState } from "react";
import "./UploadVideo.css";
import playIcon from "../../assets/play-icon.svg";
import likeIcon from "../../assets/like.svg";
import dislikeIcon from "../../assets/dislike.svg";
import uploadIcon from "../../assets/upload.png";
import { db, storage } from "../../firebase";
import firebase from "firebase";
import { useSelector } from "react-redux";

export const UploadVideo = ({ modalClosed }) => {
  const reduxState = useSelector(({ state }) => state);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [miniature, setMiniature] = useState("");
  const [video, setVideo] = useState("");
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState("");
  const [upload, setUpload] = useState(false);

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
    setUpload(true);
    const authUser = reduxState;
    console.log("ser", authUser);
    let urlImage = "";
    e.preventDefault();
    let uploadTask = storage
      .ref(`${authUser.email}/${title}/miniature/${image.name}`)
      .put(image);
    await uploadTask.on(
      "state_changed",
      (snapshot) => {},
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
            setImage("");
            setVideo("");
            setTitle("");
            setDescription("");
            setMiniature("");
            setProgress(0);
            setUpload(false);
            modalClosed();
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
          className="simple__input"
          placeholder="Titulo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required={true}
        />
        <input
          className="simple__input"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required={true}
        />
        <div className="upload-btn-wrapper">
          <p>{image.name}</p>
          <span>
            Miniatura <img src={uploadIcon} alt="upload" />
          </span>
          <input
            accept="image/*"
            onChange={imageHandleChange}
            required={true}
            type="file"
            name="myfile"
          />
        </div>
        <div className="upload-btn-wrapper">
          <p>{video.name}</p>
          <span>
            Video <img src={uploadIcon} alt="upload" />
          </span>
          <input
            accept="video/*"
            onChange={videoHandleChange}
            required={true}
            type="file"
            name="myfile"
          />
        </div>
        <progress
          className="imageupload__progress"
          value={progress}
          max="100"
        />

        <button disabled={upload}>Subir video</button>
      </form>
    </div>
  );
};
