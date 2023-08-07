import { useSelector } from "react-redux"

export function useBoard() {
    const {allBoard, idBoard, name, text} = useSelector(state => state.board)

    return {
        allBoard,
        idBoard,
        name,
    }
}