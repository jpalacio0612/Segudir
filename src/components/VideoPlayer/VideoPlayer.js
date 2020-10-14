import React, { useEffect, useState } from "react";
import { Player } from "video-react";
import "video-react/dist/video-react.css";
import "./VideoPlayer.css";
import likeIcon from "../../assets/like.svg";
import dislikeIcon from "../../assets/dislike.svg";
import sendIcon from "../../assets/send-icon.svg";
import { useSelector } from "react-redux";

export const VideoPlayer = ({ location: { course } }) => {
  const [authUser, setAuthUser] = useState({ isAuth: false });
  const reduxState = useSelector(({ state }) => state);
  console.log(course);

  useEffect(() => {
    setAuthUser(reduxState ? reduxState : { isAuth: false });
  }, [reduxState]);

  return (
    <div className="videoplayer">
      {authUser.isAuth && course && (
        <div className="videoplayer__grid">
          <div className="videoplayer__player">
            <Player>
              <source src={course.videoUrl} />
            </Player>
            <div className="videoplayer__player__description">
              <div>
                <h1>{course.title}</h1>
                <p>{`Por ${course.mentorName}`}</p>
              </div>
              <div className="course__bottom--rating">
                <img src={likeIcon} alt="like icon" />
                <span>1024</span>
                <img src={dislikeIcon} alt="dislike icon" />
                <span>24</span>
              </div>
            </div>
          </div>
          <div className="videoplayer__comments">
            <span>
              <input placeholder="Escribe aqui tu comentario..." />
              <img src={sendIcon} alt="send icon" />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
