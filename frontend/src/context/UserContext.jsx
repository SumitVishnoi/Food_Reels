import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthDataContext } from './AuthContext'
export const UserDataContext = createContext()

const UserContext = ({children}) => {
    const [userData, setUserData] = useState("")
    const [partner, setPartner] = useState("")
    const {serverUrl} = useContext(AuthDataContext)
    
    const getUserData = async () => {
        const response = await axios.get(`${serverUrl}/api/auth/getuser`, 
            {withCredentials:true})
        setUserData(response.data)
    }

    const value = {
        getUserData,
        userData,
        setUserData,
    }

    useEffect(()=> {
        getUserData()
    }, [])

  return (
    <div>
        <UserDataContext.Provider value={value}>
            {children}
        </UserDataContext.Provider>
    </div>
  )
}

export default UserContext