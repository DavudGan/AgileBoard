import {useState, React} from 'react';
import { deleteBoard } from '../DataUser/BoardDB';
import { useBoard } from '../../hooks/useBoard';
import { useDispatch} from 'react-redux';
import { removeBoard } from '../../store/slices/boardSlice';
import { BsTrash } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import './BoardCSS.css'

const Board = () => {

    const {allBoard} = useBoard()
    const [board, setBoard] = useState([])

    
    const dispatch = useDispatch()

    async function deleteB(idBoards){
        let massBoard = await deleteBoard(idBoards)
        dispatch (removeBoard({
            idBoards
        }))
        console.log(allBoard)
        setBoard(massBoard)
        return(massBoard)
    }

    return  (
        <div className='board'>
            {allBoard.map(ind => 
            (<div className='board_info' key={ind.id}>
                <div>{ind.name}</div>
                <div>
                    <button onClick={() => deleteB(ind.id)} className ="trash">
                        <BsTrash size={22} className ="trash"/>
                    </button>

                    <button onClick={() => ""} className ="settings">
                        <FiSettings size={22} className ="settings"/>
                    </button>
                </div>

                {/* <div>
                    <button
                        onClick={() => deleteB(ind.id)}>
                        Удалит
                    </button>

                    <button
                        onClick={() => deleteB(ind.id)}>
                        Переименоват
                    </button>
                </div> */}
            </div>))}
        </div>
    )
    
}

export default Board