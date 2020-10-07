import React from 'react'
import googleLogo from '../../assets/google_logo.png'
import './SignIn.css'

export const SignIn = () => {
  return (
    <div className="signin">
      <div className="signin__form">
        <div className="signin__google">
          <button> Inicia sesión con <img src={googleLogo} alt="logo de google"/> </button>
        </div>
        <form>
          <input placeholder="Correo electrónico"/>
          <input placeholder="Contraseña"/>
          <button>Iniciar sesión</button>
          <p>¿Olvidaste tu contraseña?</p>
        </form>
        <div className="signin__register">
          <p>¿Aun no tienes una cuenta?</p>
          <button>Registrate</button>
        </div>
      </div>
    </div>
  )
}
