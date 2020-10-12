import React, { useEffect, useState } from "react";
import { Player } from "video-react";
import "video-react/dist/video-react.css";
import "./VideoPlayer.css";
import likeIcon from "../../assets/like.svg";
import dislikeIcon from "../../assets/dislike.svg";
import sendIcon from "../../assets/send-icon.svg";
import { useSelector } from "react-redux";

export const VideoPlayer = () => {
  const [authUser, setAuthUser] = useState({ isAuth: false });
  const reduxState = useSelector(({ state }) => state);

  useEffect(() => {
    setAuthUser(reduxState ? reduxState : { isAuth: false });
  }, [reduxState]);

  return (
    <div className="videoplayer">
      {authUser.isAuth && (
        <div className="videoplayer__grid">
          <div className="videoplayer__player">
            <Player>
              <source src="https://firebasestorage.googleapis.com/v0/b/segudir.appspot.com/o/camara%20termica.mp4?alt=media&token=764520cb-1022-449e-91eb-72700d0aa265" />
            </Player>
            <div className="videoplayer__player__description">
              <div>
                <h1>Camaras Termicas</h1>
                <p>Por Jonathan Palacio</p>
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
