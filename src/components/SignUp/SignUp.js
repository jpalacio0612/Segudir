import React, { useState } from "react";
import firebase, { firestore } from "firebase";
import "./SignUp.css";
import googleLogo from "../../assets/google_logo.png";
import { auth, db } from "../../firebase";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Modal } from "../Modal/Modal";
import succesfull from "../../assets/successful.gif";

export const SignUp = () => {
  const { register, handleSubmit, errors, watch } = useForm();
  const [modelToggle, setModelToggle] = useState(false);
  const history = useHistory();
  var provider = new firebase.auth.GoogleAuthProvider();

  const handleClose = () => {
    setModelToggle(false);
    history.push("/");
  };

  const onSubmit = ({ name, lastname, email, password }) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        db.collection("students")
          .doc(auth.currentUser.uid)
          .set({
            name: name,
            lastName: lastname,
            email: email,
          })
          .catch((error) => {
            console.log(
              "Something went wrong with added user to firestore: ",
              error
            );
          });
        setModelToggle(true);
      })
      .catch((error) => alert(error.message));
  };

  function addNewUserToFirestore(user) {
    const collection = db.collection("students");
    const { profile } = user.additionalUserInfo;
    const details = {
      name: profile.given_name,
      lastName: profile.family_name,
      email: profile.email,
      picture: profile.picture,
      createdDtm: firestore.FieldValue.serverTimestamp(),
      lastLoginTime: firestore.FieldValue.serverTimestamp(),
    };
    collection.doc(auth.currentUser.uid).set(details);
  }

  const googleSingIn = () => {
    auth
      .signInWithPopup(provider)
      .then((user) => {
        console.log(user);
        try {
          const docRef = db.collection("students").doc(auth.currentUser.uid);
          docRef
            .get()
            .then((doc) => {
              if (doc.exists) {
                const collection = db.collection("students");
                collection.doc(auth.currentUser.uid).set(
                  {
                    lastLoginTime: firestore.FieldValue.serverTimestamp(),
                  },
                  { merge: true }
                );
                setModelToggle(true);
              } else {
                addNewUserToFirestore(user);
                setModelToggle(true);
              }
            })
            .catch((error) => {
              console.error('Checking if customer exists failed" ' + error);
            });
        } catch (error) {
          console.log("Something generic went wrong, ", error);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="signup">
      <div className="signup__form">
        <h3>Crea tu cuenta</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            name="name"
            placeholder="Nombres"
            ref={register({ required: true })}
          />
          {errors.name && <span>El nombre es necesario</span>}
          <input
            name="lastname"
            placeholder="Apellidos"
            ref={register({ required: true })}
          />
          {errors.lastname && <span>El apellido es necesario</span>}
          <input
            name="email"
            type="email"
            placeholder="Correo electrónico"
            ref={register({ required: true })}
          />
          {errors.email && <span>Ingrese un correo electronico valido</span>}
          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            ref={register({ required: true })}
          />
          {errors.password && <span>Ingrese una contraseña</span>}
          <input
            name="secondPassword"
            type="password"
            placeholder="Repetir contraseña"
            ref={register({
              validate: (value) => {
                return value === watch("password");
              },
            })}
          />
          {errors.secondPassword && <span>Las contraseñas no coinciden</span>}
          <button>Registrarse</button>
        </form>
        <div className="signup__google">
          <button onClick={googleSingIn}>
            Registrate con <img src={googleLogo} alt="logo de google" />
          </button>
        </div>
      </div>
      <Modal show={modelToggle} modalClosed={handleClose}>
        <div className="signup__succesfull">
          <img src={succesfull} alt="succesfull" />
          <h2>Registro Exitoso</h2>
          <button onClick={handleClose}>Continuar</button>
        </div>
      </Modal>
    </div>
  );
};
