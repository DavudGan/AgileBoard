import localforage from "localforage";
import uuid from "react-uuid"

export async function getUsers(query) {
    await fakeNetwork(`getUsers:${query}`);
    let users = await localforage.getItem("users");
    if (!users) users = [];
    return users
}

export async function createUser(login, password) {
    let id = uuid()
    let user = {id, login, password}
    let users = await getUsers()
    users.unshift(user)
    await set(users)
    return user
}

export async function Registered(login, password) {
    await fakeNetwork(`user:${login}${password}`)
    let users = await getUsers()
    let user = await users.find(user => user.login === login && user.password === password)
    if (!user) user = []
    return user.login === login && user.password === password? true:false
}

export async function checkForDuplicate(login) {
    await fakeNetwork(`user:${login}`)
    let users = await getUsers()
    let user = await users.find(user => user.login === login)
    if (!user) user = []
    return user.login === login? false:true
}

export async function getUser(login) {
    await fakeNetwork(`user:${login}`)
    let users = await localforage.getItem('users')
    let user = users.find(user => user.login === login)
    return user ?? null
}

function set(users) {
    return localforage.setItem('users', users)
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
