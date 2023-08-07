import {useState, React, useEffect} from 'react';
import { getBoard, createBoard } from '../DataUser/BoardDB';
import {Navigate} from 'react-router-dom';
import {useAuth} from '../../hooks/useAuth'
import { useDispatch} from 'react-redux';
import { setBoard,clearBoard } from '../../store/slices/boardSlice';
import { useBoard } from '../../hooks/useBoard';
import './CreateBoardCSS.css'



const CreateBoard = () => {
    const [nameBoard, setName] = useState('')
    const [popap, setPopap] = useState(false)
    const [board, setBoards] = useState([{}])

    const {isAuth,id} = useAuth()

    const dispatch = useDispatch()

    async function getB() {
        let massBoard = await getBoard(id)
        dispatch (clearBoard([]))
        massBoard.filter(ind =>
          dispatch (setBoard({
            allBoard: {id:ind.idBoards, name:ind.name}
          }))
        )
        return (massBoard)
    }

    async function createBoards () {
        if (nameBoard){
          await createBoard(nameBoard, id)
          let massBoard = await getBoard(id)
          dispatch (setBoard({
            allBoard: {id:massBoard[0].idBoards, name:nameBoard}
          }))
          setName('')
        } else {
            console.log("Error")
        }
    }

    useEffect(() =>{
        getB().then(value => {
            setBoards(value)
        })
    },[])

    const a = () => {
        popap ? setPopap(false):setPopap(true)
    }

    return isAuth ? (
        
        <div className='board_create'>
            {popap && (<div className='board_create_popap'>
                <div className='board_create_popap_1'>
                    <div>{id}</div>
                    <input 
                        className='name_board_sign_inp'
                        placeholder='Название доски'
                        type="text"
                        onChange = {e => setName(e.target.value)}
                        onKeyUp={e => e.key === 'Enter' && createBoards()}
                        value = {nameBoard}
                    />

                    <button
                        className='create_board'
                        onClick={() => createBoards()}>Создать доску
                    </button>
                    
                    <button 
                        className='b_close_board'
                        onClick={()=>a()}>
                        Закрыт
                    </button>
                </div>
            </div>)}

            <button
                className='b_create_board'
                onClick={()=>a()}>
                Создать доску
            </button>
        </div>

    ): (<Navigate to = "/login" />)
    
}

export default CreateBoard