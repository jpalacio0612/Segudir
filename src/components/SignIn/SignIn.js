import { auth } from "../../firebase";
import React from "react";
import { useForm } from "react-hook-form";
import googleLogo from "../../assets/google_logo.png";
import "./SignIn.css";

export const SignIn = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = ({ email, password }) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log("Logeo Existoso");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="signin">
      <div className="signin__form">
        <div className="signin__google">
          <button>
            Inicia sesión con <img src={googleLogo} alt="logo de google" />{" "}
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            placeholder="Correo electrónico"
            type="text"
            name="email"
            ref={register({ required: true })}
          />
          <input
            placeholder="Contraseña"
            type="password"
            name="password"
            ref={register({ required: true })}
          />
          <button>Iniciar sesión</button>
          <p>¿Olvidaste tu contraseña?</p>
        </form>
        <div className="signin__register">
          <p>¿Aun no tienes una cuenta?</p>
          <button>Registrate</button>
        </div>
      </div>
    </div>
  );
};
