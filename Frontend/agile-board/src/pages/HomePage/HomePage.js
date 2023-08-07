import React from 'react';
import {Navigate} from 'react-router-dom';
import {useAuth} from '../../hooks/useAuth'
import { useDispatch } from 'react-redux';
import {removeUser} from '../../store/slices/userSlice';
import Board from '../Board/Board';
import CreateBoard from '../Board/CreateBoard';
import './HomePageCSS.css'


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
        <CreateBoard />
      </div>

      <Board />
      
    </div>

    
  ) : (<Navigate to = "/login" />)
}

export default HomePage