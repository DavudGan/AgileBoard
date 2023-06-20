import React from 'react';
import {Link} from 'react-router-dom';

const LoginPage = () => {
  return (
    <div>
        <h1>Login</h1>
        <button>
         <Link to='/register'>Регестрация</Link>
        </button>
    </div>
  )
}

export default LoginPage