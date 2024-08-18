import React from "react";
import './Login.css'
import { useState } from "react";

const info = {
    username: 'jianxion',
    password: '123'
}

function Login({islogin, onsetIslogin}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    const handleSubmit = () => {
        event.preventDefault()
        if (username == info.username && password == info.password) {
            onsetIslogin(true)
            localStorage.setItem('islogin', true)
        }

    }

    return (
        <form>
            <label>username</label>
            <input type="text" onChange={(e) => {setUsername(e.target.value)}}/>
            <label>password</label>
            <input type="password" onChange={(e) => {setPassword(e.target.value)}}/>
            <button onClick={handleSubmit}>Submit</button>
        </form>
    )
}

export default Login