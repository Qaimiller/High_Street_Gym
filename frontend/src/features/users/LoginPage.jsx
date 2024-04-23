import { useState } from "react"
import * as Users from "../../api/users.js"
import { useNavigate } from "react-router-dom"
import { useAuthentication } from "../authentication.jsx"

export default function LoginPage() {
    const navigate = useNavigate()
    const [user, login, logout, refresh] = useAuthentication()
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [statusMessage, setStatusMessage] = useState("")

    function onLoginSubmit(e) {
        e.preventDefault()
        setStatusMessage("Logging in...")

        console.log("ready to validation")
        if(!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(formData.email)){
            setStatusMessage("Invalid email address")
            return
        }
        console.log("finished validation")

        login(formData.email, formData.password).then(result => {
            setStatusMessage("Login successful!")
            navigate("/bookings")
        }).catch(error => {
            setStatusMessage("Login failed: " + error)
        })

        // Users.login(formData.email, formData.password).then(authKey => {
        //     if (authKey) {
        //         localStorage.setItem("authenticationKey", authKey)
        //         setStatusMessage("Login successful!")
        //         console.log(localStorage.getItem("authenticationKey"))
        //         navigate("/bookings")
        //     } else {
        //         setStatusMessage("Invalid credentials!")
        //     }
        // })
    }

    // function onLogoutSubmit(e) {
    //     e.preventDefault()
    //     Users.logout(localStorage.getItem("authenticationKey")).then(result => {
    //         setStatusMessage(result)
    //     })
    // }

    return <div className="flex justify-center">
        <form className="flex-grow max-w-md m-4">
            <h2 className="text-4xl mb-8 text-center">High Street Gym</h2>
            <h2 className="text-3xl mb-8 text-center">Login</h2>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Email:</span>
                </label>
                <input type="email" 
                    placeholder="jack@gmail.com"
                    className="input input-bordered"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                <label className="label">
                    <span className="label-text">Password:</span>
                </label>
                <input type="password"
                    placeholder="password"
                    className="input input-bordered"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <button className="btn btn-primary mt-4"
                    onClick={(e) => onLoginSubmit(e)}>Login</button>
                <button className="btn btn-secondary mt-4"
                    onClick={(e) => navigate("/register")}>Sign up</button>
                <label className="label">
                    <span className="label-text-alt">{statusMessage}</span>
                </label>

                {/* <button onClick={(e) => onLogoutSubmit(e)}>Logout</button>
                <span></span> */}
            </div>
        </form>
    </div>
}