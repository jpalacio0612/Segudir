import React, { useEffect, useState } from "react";
import { Player } from "video-react";
import "video-react/dist/video-react.css";
import "./VideoPlayer.css";
import likeIcon from "../../assets/like.svg";
import dislikeIcon from "../../assets/dislike.svg";
import sendIcon from "../../assets/send-icon.svg";
import { useSelector } from "react-redux";
import { db } from "../../firebase";
import firebase from "firebase";

export const VideoPlayer = ({ location: { course } }) => {
  const reduxState = useSelector(({ state }) => state || {});
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  console.log(course);

  useEffect(() => {
    let unsubscribe = () => {};
    if (course["mediaId"]) {
      console.log("exits");
      unsubscribe = db
        .collection("media")
        .doc(course["mediaId"])
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [course]);

  const postComment = () => {
    db.collection("media").doc(course["mediaId"]).collection("comments").add({
      text: comment,
      username: reduxState["name"],
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  return (
    <div className="videoplayer">
      {reduxState["isAuth"] && course && (
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
              <input
                placeholder="Escribe aqui tu comentario..."
                onChange={(e) => setComment(e.target.value)}
              />
              <img src={sendIcon} alt="send icon" onClick={postComment} />
            </span>
            {comments.map((comment) => (
              <p>
                <strong>{comment.username}</strong> {comment.text}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
