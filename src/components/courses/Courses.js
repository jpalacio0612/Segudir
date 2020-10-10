import React from "react";
import playIcon from "../../assets/play-icon.svg";
import likeIcon from "../../assets/like.svg";
import dislikeIcon from "../../assets/dislike.svg";
import "./Courses.css";

export const Courses = () => {
  return (
    <div className="courses">
      <div className="courses__grid">
        <div className="course">
          <div className="course__top">
            <img src={playIcon} alt="play button" />
          </div>
          <div className="course__bottom">
            <h2>Camaras termicas</h2>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Assumenda, molestias iste sit qui ipsum asperiores dicta quo ad
              optio! Id pariatur hic quo consectetur est! Quae aspernatur
              deserunt maxime doloremque?
            </p>
            <div className="course__bottom--rating">
              <img src={likeIcon} alt="like icon" />
              <span>1024</span>
              <img src={dislikeIcon} alt="dislike icon" />
              <span>24</span>
            </div>
          </div>
        </div>
        <div className="course">
          <div className="course__top">
            <img src={playIcon} alt="play button" />
          </div>
          <div className="course__bottom">
            <h2>Camaras termicas</h2>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Assumenda, molestias iste sit qui ipsum asperiores dicta quo ad
              optio! Id pariatur hic quo consectetur est! Quae aspernatur
              deserunt maxime doloremque?
            </p>
            <div className="course__bottom--rating">
              <img src={likeIcon} alt="like icon" />
              <span>1024</span>
              <img src={dislikeIcon} alt="dislike icon" />
              <span>24</span>
            </div>
          </div>
        </div>
        <div className="course">
          <div className="course__top">
            <img src={playIcon} alt="play button" />
          </div>
          <div className="course__bottom">
            <h2>Camaras termicas</h2>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Assumenda, molestias iste sit qui ipsum asperiores dicta quo ad
              optio! Id pariatur hic quo consectetur est! Quae aspernatur
              deserunt maxime doloremque?
            </p>
            <div className="course__bottom--rating">
              <img src={likeIcon} alt="like icon" />
              <span>1024</span>
              <img src={dislikeIcon} alt="dislike icon" />
              <span>24</span>
            </div>
          </div>
        </div>
        <div className="course">
          <div className="course__top">
            <img src={playIcon} alt="play button" />
          </div>
          <div className="course__bottom">
            <h2>Camaras termicas</h2>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Assumenda, molestias iste sit qui ipsum asperiores dicta quo ad
              optio! Id pariatur hic quo consectetur est! Quae aspernatur
              deserunt maxime doloremque?
            </p>
            <div className="course__bottom--rating">
              <img src={likeIcon} alt="like icon" />
              <span>1024</span>
              <img src={dislikeIcon} alt="dislike icon" />
              <span>24</span>
            </div>
          </div>
        </div>
        <div className="course">
          <div className="course__top">
            <img src={playIcon} alt="play button" />
          </div>
          <div className="course__bottom">
            <h2>Camaras termicas</h2>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Assumenda, molestias iste sit qui ipsum asperiores dicta quo ad
              optio! Id pariatur hic quo consectetur est! Quae aspernatur
              deserunt maxime doloremque?
            </p>
            <div className="course__bottom--rating">
              <img src={likeIcon} alt="like icon" />
              <span>1024</span>
              <img src={dislikeIcon} alt="dislike icon" />
              <span>24</span>
            </div>
          </div>
        </div>
        <div className="course">
          <div className="course__top">
            <img src={playIcon} alt="play button" />
          </div>
          <div className="course__bottom">
            <h2>Camaras termicas</h2>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Assumenda, molestias iste sit qui ipsum asperiores dicta quo ad
              optio! Id pariatur hic quo consectetur est! Quae aspernatur
              deserunt maxime doloremque?
            </p>
            <div className="course__bottom--rating">
              <img src={likeIcon} alt="like icon" />
              <span>1024</span>
              <img src={dislikeIcon} alt="dislike icon" />
              <span>24</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
