import {useState,React} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Registered, getUser} from '../DataUser/UserDB';
import icon_men from './icon_men.png';
import check_list from './Checklist.jpg';
import './LoginPageCSS.css'
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/slices/userSlice';


const LoginPage = () => {

  const [loginUser, setLogin] = useState('')
  const [passUser, setPass] = useState('')
  const [errorMessage, setErrorMessage] = useState(false)
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function loginUserChek () {
      
    if(await Registered(loginUser,passUser)) {
      let user = await getUser(loginUser)
      dispatch (setUser({
        name: user.login,
        id: user.id,
        pass: user.password
      }))
      return navigate(`/`)
    } 

    else {
      setErrorMessage (true)
    }
  }

  return (
    <div className='login'>

      <div>
        <img 
          className='check_list'
          src={check_list} 
          alt='check-list' 
          height={800} width={1000}>
        </img>
      </div>

      <div className='login_page'>
        <img 
          className='icon_men'
          src={icon_men} 
          alt='icon-men' 
          height={150} width={150}>
        </img>

        <p className='login_sign_in'>
          <input 
            className='login_sign_inp'
            placeholder='login'
            type="text" 
            onChange={e => setLogin(e.target.value)}
            value = {loginUser}
          />

          <input
            className='login_sign_inp'
            placeholder='password'
            type="password" 
            onChange={e => setPass(e.target.value)}
            value = {passUser}
          />
        </p>

        <button 
          className='btn_login' 
          onClick={() => (console.log(loginUserChek()))}>
          Войти 
        </button>

        { errorMessage && 
          (<p className='error'> Введены неправильные данные для вход!</p>)}

        <p>
          Если нет аккаунта то зарегистрируйтесь по {" "}
          <Link to='/register'>ссылке</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage