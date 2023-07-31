import {useState,React} from 'react'
import {Link, useNavigate} from 'react-router-dom';
import {createUser, checkForDuplicate, getUser} from '../DataUser/UserDB'
import reg_icon from './reg-icon.jpg';
import people from './people.png'
import '../LoginPage/LoginPageCSS.css'
import {useDispatch} from 'react-redux';
import {setUser} from '../../store/slices/userSlice';



const RegisterPage = () => {
  const [loginRegUser, setRegLogin] = useState('')
  const [passwordRegUser, setRegPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function RegUserChek () {

    if (loginRegUser && passwordRegUser && await checkForDuplicate(loginRegUser)){
      await createUser(loginRegUser,passwordRegUser)
      let user = await getUser(loginRegUser)
      dispatch (setUser({
        name: user.login,
        id: user.id,
        pass: user.password
      }))
      return navigate(`/`)
    } else {
        setErrorMessage (true)
      }
  }

  return (
    <div className='login'>
      <div>
        <img 
            className='reg_icon'
            src={reg_icon} 
            alt='reg_icon' 
            height={800} width={1000}>
        </img>
      </div>

      <div className='login_page'>
        <img 
          className='people'
          src={people} 
          alt='people' 
          height={150} width={150}>
        </img>

        <p className='login_sign_in'>
          <input
            className='login_sign_inp'
            placeholder='login'
            type="text"
            onChange = {e => setRegLogin(e.target.value)}
            value = {loginRegUser}
          />
          <input
            className='login_sign_inp'
            placeholder='password'
            type="password"
            onChange = {e => setRegPassword(e.target.value)}
            value = {passwordRegUser}
          />
        </p>
        <button
          className='btn_login'  
          onClick={() => RegUserChek()}>Регистрация
        </button>

        {errorMessage && (<p className='error'>Данный пользователь уже зарегистрирован! Для входа нажмите на{" "}<Link to='/login'>ссылку</Link></p>)}

        <p>
          Есть аккаунт? Перейди по {" "}<Link to='/login'>ссылке</Link>
        </p>

      </div>
    </div>
  )
}

export default RegisterPage