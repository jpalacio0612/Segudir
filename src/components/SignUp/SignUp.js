import React from 'react'
import './SignUp.css'
import googleLogo from '../../assets/google_logo.png'

export const SignUp = () => {
  return (
    <div className="signup">
      <div className="signup__form">
        <h3>Crea tu cuenta</h3>
        <form>
          <input placeholder="Nombres"/>
          <input placeholder="Apellidos"/>
          <input placeholder="Correo electrónico"/>
          <input placeholder="Contraseña"/>
          <input placeholder="Repetir contraseña"/>
          <button>Registrarse</button>
        </form>
      <div className="signup__google">
        <button> Registrate con <img src={googleLogo} alt="logo de google"/> </button>
      </div>
      </div>
    </div>
  )
}
