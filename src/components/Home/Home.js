import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import homeImage from "../../assets/hero.jpg";
import { db } from "../../firebase";
import { CourseCard } from "../CourseCard/CourseCard";
import "./Home.css";

export const Home = () => {
  const [media, setMedia] = useState([]);
  const authUser = useSelector(({ state }) => state || {});

  useEffect(() => {
    console.log("me ejecute");
    const mediaArray = [];
    db.collection("media")
      .orderBy("timestamp", "desc")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          mediaArray.push({ ...doc.data(), mediaId: doc.id });
        });
        setMedia(mediaArray);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="home">
      <div className="hero">
        <div className="hero__left">
          <h1>
            Cursos online <br /> Seguridad Electrónica
          </h1>
          <p>
            Empieza ya tu camino como un profesional en la seguridad
            electrónica.
          </p>
          <button>Comienza ahora</button>
        </div>
        <div className="hero__right">
          <img src={homeImage} alt="Security cameras" />
        </div>
      </div>
      <h2 className="lastCourses__title">Ultimos Cursos</h2>
      <section className="carousel">
        <div className="carousel__container">
          {media.slice(0, 4).map((course) => (
            <CourseCard
              course={course}
              authUser={authUser}
              key={course.mediaId}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
