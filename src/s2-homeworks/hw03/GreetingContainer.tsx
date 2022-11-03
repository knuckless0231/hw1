import React, {ChangeEvent, ChangeEventHandler, KeyboardEvent, useState} from 'react'
import Greeting from './Greeting'
import {UserType} from './HW3'


type GreetingContainerPropsType = {
    users: UserType[]
    addUserCallback: (name: string) => void
}


export const pureAddUser = (name: string,
                            setError: (error: string) => void,
                            setName: (name: string) => void,
                            addUserCallback: (name: string) => void) => {

    if(name.trim() === ''){
        setError("Ошибка! Введите имя!")
    }
    if (name.trim() !== ""){
        setName(name.trim())
        addUserCallback(name.trim())
        setName('')
    }

    // если имя пустое - показать ошибку, иначе - добавить юзера и очистить инпут
}

export const pureOnBlur = (name: string, setError: (error:string)=>void) => {
    if (name.trim() === "") {
        setError("Ошибка! Введите имя!")
    }
    // если имя пустое - показать ошибку

}

export const pureOnEnter = (e: KeyboardEvent<HTMLInputElement>, addUser: (name: string) => void) => {
    if (e.key === 'Enter') {
        addUser("")
    }
    // если нажата кнопка Enter - добавить
}


const GreetingContainer: React.FC<GreetingContainerPropsType> =
    ({users, addUserCallback,}) => {


    const [name, setName] = useState<string>('')
    const [error, setError] = useState<string>('Error')

    const setNameCallback = (value: string) => { // need to fix any
        setName(value) // need to fix

        error && setError('')
    }
    const addUser = () => {
        pureAddUser(name, setError, setName, addUserCallback)
    }

    const onBlur = () => {
        pureOnBlur(name, setError)
    }

    const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        pureOnEnter(e, addUser)
    }

    const totalUsers = users.length
    const lastUserName = users.length ? users[users.length-1].name : '' ;
    //     const lastUserName = users[totalUsers-1].name


    return (
        <Greeting
            name={name}
            setNameCallback={setNameCallback}
            addUser={addUser}
            onBlur={onBlur}
            onEnter={onEnter}
            error={error}
            totalUsers={totalUsers}
            lastUserName={lastUserName}
        />
    )
}

export default GreetingContainer
