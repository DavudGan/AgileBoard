import React from 'react'
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  return (
    <div>
    <h1>Register</h1>
    <input type="text"></input>
    <input type="text"></input>
    <button>Регестрация</button>

    <button>
      <Link to='/login'>Войти</Link>
    </button>
</div>
  )
}

export default RegisterPage