import React, { createContext, useState, useContext } from "react"
import jwt_decode from "jwt-decode"

export const AuthContext = createContext({
	user: null,
	handleLogin: (token) => {},
	handleLogout: () => {}
})

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)

	/*const handleLogin = (token) => {
		const decodedUser = jwt_decode(token)
		localStorage.setItem("userId", decodedUser.sub)
		localStorage.setItem("userRole", decodedUser.roles)
		localStorage.setItem("token", token)
		setUser(decodedUser)
	}*/
	const handleLogin = (token) => {
		const decodedUser = jwt_decode(token);
	
		// Ujisti se, že `roles` je pole (v některých implementacích může být string)
		const roles = Array.isArray(decodedUser.roles) ? decodedUser.roles : [decodedUser.roles];
	
		localStorage.setItem("userId", decodedUser.sub);
		localStorage.setItem("userRole", JSON.stringify(roles)); // Uložíme role jako pole
		localStorage.setItem("token", token);
	
		setUser({ ...decodedUser, roles }); // Aktualizujeme `user` v AuthContext
	};
	
	const handleLogout = () => {
		localStorage.removeItem("userId")
		localStorage.removeItem("userRole")
		localStorage.removeItem("token")
		setUser(null)
	}

	return (
		<AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	return useContext(AuthContext)
}
