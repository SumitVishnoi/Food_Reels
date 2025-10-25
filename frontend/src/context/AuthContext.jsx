import React, { createContext} from 'react'
export const AuthDataContext = createContext()
const AuthContext = ({children}) => {
    const serverUrl = "https://food-reels-neon.vercel.app"
    let value = {
        serverUrl
    }
  return (
    <div>
        <AuthDataContext.Provider value={value}>
            {children}
        </AuthDataContext.Provider>
    </div>
  )
}

export default AuthContext