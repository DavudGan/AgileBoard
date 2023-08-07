import localforage from "localforage";
import uuid from "react-uuid"


export async function getBoards(query) {
    await fakeNetwork(`getBoards:${query}`);
    let boards = await localforage.getItem("boards");
    if (!boards) boards = [];
    return boards
}

export async function createBoard(name, idUsers) {
    let idBoards = uuid()
    let board = {idBoards, idUsers, name}
    let boards = await getBoards()
    boards.unshift(board)
    await set(boards)
    return board
}

export async function deleteBoard(idBoard) {
    await fakeNetwork(`board:${idBoard}`)
    let boards = await getBoards()
    await boards.filter((item, index, arr) => {
            if (item.idBoards === idBoard){
                arr.splice(index,1)
            }
        }  
    )
    await set(boards)
    return boards
}


export async function checkForDuplicate(idBoards) {
    await fakeNetwork(`board:${idBoards}`)
    let boards = await getBoards()
    let board = await boards.find(board => board.idBoards === idBoards)
    if (!board) board = []
    return board.idBoards === idBoards? false:true
}

export async function getBoard(idUsers) {
    await fakeNetwork(`board:${idUsers}`)
    let boards = await localforage.getItem('boards')
    let board = boards? boards.filter(board => board.idUsers === idUsers):[]
    return board ?? null
}

function set(boards) {
    return localforage.setItem('boards', boards)
}

let fakeCanche = {}

async function fakeNetwork (kay) {
    if (!kay) {
        fakeCanche = {}
    }

    if (fakeCanche[kay]) {
        return
    }

    fakeCanche[kay] = true;
    return new Promise(res => {
        setTimeout(res, Math.random() * 800)
    })
}
