import { useContext, useEffect, createContext, useState } from "react"

const AuthContext = createContext({
       isAuthenticated: false,
})

 export default function AuthProvider({children}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <div>
      <AuthContext.Provider value={{ isAuthenticated}}>{children}</AuthContext.Provider>
    </div>
  )
}

export const useAuth = () => useContext(AuthContext);

