import React, { useEffect, useState } from "react";
import "./Courses.css";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../firebase";
import { CourseCard } from "../CourseCard/CourseCard";

export const Courses = () => {
  const [media, setMedia] = useState([]);
  const authUser = useSelector(({ state }) => state || {});
  const dispatch = useDispatch();

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
    <div className="courses">
      <div className="courses__grid">
        {media.map((course) => (
          <CourseCard
            course={course}
            authUser={authUser}
            key={course.mediaId}
          />
        ))}
      </div>
    </div>
  );
};
