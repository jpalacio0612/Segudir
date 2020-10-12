import React, { useState } from "react";
import "./SignUp.css";
import googleLogo from "../../assets/google_logo.png";
import { auth, db } from "../../firebase";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Modal } from "../Modal/Modal";
import succesfull from "../../assets/successful.gif";
import { googleSign } from "../../utils/firebaseAPI";

export const SignUp = () => {
  const { register, handleSubmit, errors, watch } = useForm();
  const [modelToggle, setModelToggle] = useState(false);
  const history = useHistory();

  const handleClose = () => {
    setModelToggle(false);
    history.push("/");
  };

  const signUp = ({ name, lastname, email, password }) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        db.collection("students")
          .doc(auth.currentUser.uid)
          .set({
            name: name,
            lastName: lastname,
            email: email,
            type: "student",
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

  return (
    <div className="signup">
      <div className="signup__form">
        <h3>Crea tu cuenta</h3>
        <form onSubmit={handleSubmit(signUp)}>
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
          <button onClick={() => googleSign(history)}>
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
