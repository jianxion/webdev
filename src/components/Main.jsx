import { useEffect } from 'react'
import React from 'react'
import List from './List'
import Login from './Login'

const Main = ({islogin, setIslogin}) => {
    useEffect(() => {
        const login = localStorage.getItem('islogin')
        if (login) {
            setIslogin(true)
        }
        else {
            setIslogin(false)
        }
    }, [])

  return (
    <div className="main_container">
        {islogin ? <List /> : <Login islogin = {islogin} onsetIslogin = {setIslogin}/>}
    </div>
  )
}

export default Main