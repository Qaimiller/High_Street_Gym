import { useState  } from "react";
import { useNavigate } from "react-router-dom"
import * as Users from "../../api/users.js"
import { useAuthentication } from "../authentication.jsx"

export default function RegisterPage() {
    const navigate = useNavigate()
    const [user, login] = useAuthentication()
    const [statusMessage, setStatusMessage] = useState("")
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    function onRegisterSubmit(e) {
        e.preventDefault()
        setStatusMessage("Registering...")

        console.log("ready to validation")

        // Client side form validation
        if(!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(formData.email)){
            setStatusMessage("Invalid email address")
            return
        }
        console.log("finished validation")
        // Send register request to backend
        Users.registerUser(formData).then(result => {
            setStatusMessage(result.message)
            login(formData.email, formData.password).then(result => {
                setStatusMessage(result.message)
                navigate("/profile")
            })
            // TODO: If the registration was successful
            // try and automatically login the user
        }).catch(result => {
            setStatusMessage(result)
        })
    }

    return <div className="flex h-screen">
        <div className="m-auto">
            <form className="flex-col max-w-md" onSubmit={onRegisterSubmit}>
                <h1 className="text-4xl font-bold text-center mb-8">High Street Gym</h1>
                <h2 className="text-3xl text-center mb-4">Register</h2>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email:</span>
                    </label>
                    <input 
                        type="email"
                        placeholder="jane@gmail.com"
                        className="input input-bordered" 
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                    <label className="label">
                        <span className="label-text">Password:</span>
                    </label>
                    <input 
                        type="password"
                        placeholder="abc123"
                        className="input input-bordered" 
                        value={formData.password}
                        onChange={e => setFormData({...formData, password: e.target.value})}
                    />
                    <button className="btn btn-primary mt-4">Register</button>
                    <button 
                        className="btn btn-neutual mt-4"
                        onClick={() => navigate("/login")}>Back</button>
                    <label className="label">
                        <span className="label-text-alt">{statusMessage}</span>
                    </label>
                </div>                    
            </form>
        </div>
    </div>
}