import React, { useState } from "react";
import "./SignUp.css";
import googleLogo from "../../assets/google_logo.png";
import { auth, db } from "../../firebase";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import succesfull from "../../assets/successful.gif";
import { googleSign } from "../../utils/firebaseAPI";
import Modal from "@material-ui/core/Modal";

export const SignUp = () => {
  const { register, handleSubmit, errors, watch } = useForm();
  const history = useHistory();
  let { type } = useParams();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    history.push("/");
  };

  const signUp = ({ name, lastname, email, password }) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        db.collection(`${type}s`)
          .doc(auth.currentUser.uid)
          .set({
            name: name,
            lastName: lastname,
            email: email,
            type: `${type}`,
          })
          .catch((error) => {
            console.log(
              "Something went wrong with added user to firestore: ",
              error
            );
          });
        setOpen(true);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="signup">
      <div className="signup__form">
        {type === "student" ? (
          <h3>Crea tu cuenta</h3>
        ) : (
          <h3>Empieza a enseñar</h3>
        )}
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
          <button onClick={() => googleSign(history, type)}>
            Registrate con <img src={googleLogo} alt="logo de google" />
          </button>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className="signup__succesfull">
          <img src={succesfull} alt="succesfull" />
          <h2>Registro Exitoso</h2>
          <button onClick={handleClose}>Continuar</button>
        </div>
      </Modal>
    </div>
  );
};
