import React, { useEffect, useState } from "react";
import playIcon from "../../assets/play-icon.svg";
import likeIcon from "../../assets/like.svg";
import dislikeIcon from "../../assets/dislike.svg";
import lock from "../../assets/lock.svg";
import "./Courses.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { db } from "../../firebase";

export const Courses = () => {
  const [authUser, setAuthUser] = useState({ isAuth: false });
  const [media, setMedia] = useState([]);
  const reduxState = useSelector(({ state }) => state);

  useEffect(() => {
    setAuthUser(reduxState ? reduxState : { isAuth: false });
  }, [reduxState]);

  useEffect(() => {
    const mediaArray = [];
    db.collection("media")
      .orderBy("timestamp", "desc")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          mediaArray.push({ ...doc.data(), mediaId: doc.id });
        });
      });
    setMedia(mediaArray);
  }, []);

  return (
    <div className="courses">
      <div className="courses__grid">
        {media.map((course) => (
          <div className="course" key={course.mediaId}>
            <div className="course__top">
              <img
                src={course.imageUrl}
                className="course__top--miniature"
                alt="Miniatura"
              />
              {authUser.isAuth ? (
                <Link to={{ pathname: "/videoplayer", course }}>
                  <img
                    className="course__top--playicon"
                    src={playIcon}
                    alt="play button"
                  />
                </Link>
              ) : (
                <img
                  className="course__top--lockicon"
                  src={lock}
                  alt="lock icon"
                />
              )}
            </div>
            <div className="course__bottom">
              <h2>{course.title}</h2>
              <p>{course.description}</p>
              <div className="course__bottom--rating">
                <img src={likeIcon} alt="like icon" />
                <span>1024</span>
                <img src={dislikeIcon} alt="dislike icon" />
                <span>24</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
