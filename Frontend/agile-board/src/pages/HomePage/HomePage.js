import React from 'react';
import './HomePageCSS.css'
import {Link, Navigate} from 'react-router-dom';
import {useAuth} from '../../hooks/useAuth'
import { useDispatch } from 'react-redux';
import {removeUser} from '../../store/slices/userSlice';
import Board from '../Board/Board';


const HomePage = () => {
  const dispatch = useDispatch()
  const {isAuth, name} = useAuth()

  return isAuth ? (

    <div className='home'>

      <div className='user'>
        <h3>{name}</h3>
        <button
          className='user_exit'
          onClick={() => 
            dispatch(removeUser())
          }
          >Выйти
        </button>
      </div>
      
      <div className='link'>
        <Link to='/board' className='link_board'>
          <button
            className='link_create_board'
            >Создать доску
          </button>
        </Link>
      </div>

      <Board />
      
    </div>

    
  ) : (<Navigate to = "/login" />)
}

export default HomePage