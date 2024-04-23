import { createContext, useContext, useEffect, useState } from "react"
import {
    login as apiLogin,
    logout as apiLogout,
    getUserByAuthenticationKey
} from "../api/users"

export const AuthenticationContext = createContext(null)  // By default, there's nothing inside

export function AuthenticationProvider({ router, children }) {
    const [authenticatedUser, setAuthenticatedUser] = useState(null)

    // Handle case where the user is logged in and the page
    // is reloaded. Check localStorage to see if the authenticationKey
    // has been saved there, then attempt to load user by authenticationKey
    // to resume client side session. Redirect to login page if failed. 
    useEffect(() => {
        if (authenticatedUser == null) {
            const authenticationKey = localStorage.getItem("authenticationKey")
            if (authenticationKey) {
                getUserByAuthenticationKey(authenticationKey)
                    .then(user => {    // user might be null
                        setAuthenticatedUser(user)
                    })
                    .catch(error => {
                        router.navigate("/login")
                    })
            } else {
                router.navigate("/login")
            }
        }
    }, [])

    return <AuthenticationContext.Provider value={[authenticatedUser, setAuthenticatedUser]}>
        {children}
    </AuthenticationContext.Provider>
}

export function useAuthentication() {
    const [authenticatedUser, setAuthenticatedUser] = useContext(AuthenticationContext)

    async function login(email, password) {
        // Clear existing client side user record
        setAuthenticatedUser(null)
        // Attempt login and retrieve user if successful
        return apiLogin(email, password)
            .then(async result => {
                if (result.status == 200) {
                    // Store auth key in case page is reloaded
                    localStorage.setItem("authenticationKey", result.authenticationKey)
                    // Fetch logged in user from backend
                    const user = await getUserByAuthenticationKey(result.authenticationKey) 
                    setAuthenticatedUser(user)
                    return await Promise.resolve(result.message)
                } else {
                    return Promise.reject(result.message)
                }
            }).catch(error => {
                return Promise.reject(error)
            })
    }

    async function logout() {
        localStorage.removeItem("authenticationKey")
        if (authenticatedUser) {
            return apiLogout(authenticatedUser.authenticationKey)
                .then(result => {
                    setAuthenticatedUser(null)
                    return Promise.resolve(result.message)
                }).catch(error => {
                    return Promise.reject(error)
                })
        }
    }

    async function refresh() {
        if (authenticatedUser) {
            return getUserByAuthenticationKey(authenticatedUser.authenticationKey)
                .then(user => {
                    setAuthenticatedUser(user)
                    return Promise.resolve("User refreshed")
                })
        } else {
            return Promise.reject("User must be authenticated")
        }
    }

    return [authenticatedUser, login, logout, refresh]
}