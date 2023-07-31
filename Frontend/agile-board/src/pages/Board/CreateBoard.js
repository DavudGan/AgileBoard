import {useState, React, useEffect} from 'react';
import { getBoard, createBoard } from '../DataUser/BoardDB';
import {Navigate} from 'react-router-dom';
import {useAuth} from '../../hooks/useAuth'
import './CreateBoardCSS.css'

import { useDispatch} from 'react-redux';
import {useBoard} from '../../hooks/useBoard'
import { setBoard, removeBoard } from '../../store/slices/boardSlice';

const CreateBoard = () => {
    const [nameBoard, setName] = useState('')
    const [textBoard, setText] = useState('')
    const [board, setBoards] = useState([{text:'Создай доску ;)'}])

    const {isAuth,id} = useAuth()
    const {allBoard} = useBoard()

    const dispatch = useDispatch()

    async function getB() {
        let massBoard = await getBoard(id)
        dispatch (removeBoard({}))
        massBoard.forEach(ind =>
          dispatch (setBoard({
            allBoard: {id:ind.idBoards, name:ind.name, text:ind.text}
          }))
        )
        console.log(allBoard)
        console.log(massBoard)
        return (massBoard)
    }

    async function createBoards () {
        if (nameBoard && textBoard ){
          await createBoard(nameBoard, textBoard, id)
          let massBoard = await getBoard(id)
          dispatch (setBoard({
            allBoard: {id:massBoard.idBoards, name:nameBoard, text:textBoard}
          }))
          console.log(allBoard)
          console.log(massBoard)
        } else {
            console.log("Error")
        }
    }
    
    useEffect(() =>{
        getB().then(value => {
            setBoards(value)
        })
    },[])


    return isAuth ? (
        <div className='board_create'>
            <div>{id}</div>
            <input 
                className='name_board_sign_inp'
                placeholder='name'
                type="text"
                onChange = {e => setName(e.target.value)}
                onKeyUp={e => e.key === 'Enter' && createBoards()}
                value = {nameBoard}
            />

            <input
                className='name_board_sign_inp'
                placeholder='text'
                type="text"
                onChange = {e => setText(e.target.value)}
                onKeyUp={e => e.key === 'Enter' && createBoards()}
                value = {textBoard}
            />

            <button
                className='but_create_board'
                onClick={() => createBoards()}>Создать доску
            </button>

            <div className='board'>
            {allBoard.map(ind => 
            (<div className='board_info' key={ind.id}>
                <div>{ind.name}</div>
                <div>{ind.id}</div>
            </div>))}
        </div>

            {/* <div>{allBoard}</div> */}
            {/* { board.map((board) => (<div>{board.name}{"  "}{board.text}</div>))} */}

        </div>

    ): (<Navigate to = "/login" />)
    
}

export default CreateBoard