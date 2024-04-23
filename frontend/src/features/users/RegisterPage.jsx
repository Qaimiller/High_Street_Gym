import { useState  } from "react";
import { useNavigate, useResolvedPath } from "react-router-dom"
import * as Users from "../../api/users.js"

export default function RegisterPage() {
    const navigate = useNavigate()

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

            // TODO: If the registration was successful
            // try and automatically login the user
        })
    }

    return <div className="flex justify-center">
        <form className="m-4 flex-grow max-w-md" onSubmit={onRegisterSubmit}>
            <h1 className="text-4xl text-center mb-8">High Street Gym</h1>
            <h2 className="text-3xl text-center mb-8">Register</h2>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Email:</span>
                </label>
                <input 
                    type="text"
                    placeholder="jane@gmail.com"
                    className="input input-bordered" 
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                />
            </div>
            <div className="form-control">
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
            </div>
            <div className="my-2">
                <button className="btn btn-primary mr-6">Register</button>
                <button 
                    className="btn btn-secondary"
                    onClick={() => navigate("/login")}>Back</button>
                <label className="label">
                    <span className="label-text-alt">{statusMessage}</span>
                </label>
            </div>
        </form>
    </div>
}