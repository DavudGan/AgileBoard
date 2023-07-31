import {useState, React, useEffect} from 'react';
import { getBoard,deleteBoard } from '../DataUser/BoardDB';
import {useAuth} from '../../hooks/useAuth';
import './BoardCSS.css'

const Board = () => {
    const {id} = useAuth()
    const [board, setBoard] = useState([])

    useEffect(() =>{
        getB().then(value => {
            setBoard(value)
        })
    },[])

    async function deleteB(idBoards){
        let massBoard = await deleteBoard(idBoards)
        setBoard(massBoard)
        return(massBoard)
    }

    async function getB() {
        let massBoard = await getBoard(id)
        return (massBoard)
    }


    return  (
        <div className='board'>
            {board.map(board => 
            (<div className='board_info' key={board.idBoards}>
                <div>{board.name}</div>
                <div className='board_info_text'>{board.text}</div>
                <button
                    onClick={() => deleteB(board.idBoards)}
                >Удалит</button>
            </div>))}
        </div>
    )
    
}

export default Board