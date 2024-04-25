import { useEffect, useState } from "react"
import { useAuthentication } from "../authentication.jsx"
import * as Users from "../../api/users.js"
import Header from "../../common/Header.jsx"
import Nav from "../../common/Nav.jsx"

export default function ProfilePage() {
    const [user, , , refresh] = useAuthentication()  // async?
    console.log("user"+user)
    const [statusMessage, setStatusMessage] = useState("")
    // const [userId, setUserId] = useState()
    const [formData, setFormData] = useState({  // Same structure with user
        id: null,
        email: "",
        password: "",
        role: "",
        phone: "",
        first_name: "",
        last_name: "",
        address: "",
        authentication_key: null
    })
    console.log("initialform"+formData)

    useEffect(() => {
        if (user) {
            // TODO: add authKey as second parameter
            Users.getUserById(user.id).then(result => {
                setFormData(result)
                console.log("formdata"+formData)

            })
        }
    }, [user])

    function onUpdateSubmit(e) {
        e.preventDefault()

        // Client side form validation
        if(!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(formData.email)){
            setStatusMessage("Invalid email address!")
            return
        }
        setStatusMessage("Updating...")
        Users.updateUser(formData).then(result => {
            setStatusMessage(result.message)
            if (result.user) {
                setFormData(result.user)
            }
        })    
    }

    function clear(e) {
        e.preventDefault()
        console.log("before clear")
        setFormData({
            id: null,
            email: "",
            password: "",
            role: "",
            phone: "",
            first_name: "",
            last_name: "",
            address: "",
            authentication_key: null
        })
        setStatusMessage("")
    }

    return <div>
        <Header />
        <div className="flex justify-center">
            <form className="mb-40 flex-grow max-w-md">
                <div className="text-xl mb-8 text-center">Personal Details</div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">First Name:</span>
                    </label>
                    <input 
                        type="text"
                        className="input input-bordered"
                        value={formData.first_name}
                        onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Last Name:</span>
                    </label>
                    <input 
                        type="text"
                        className="input input-bordered"
                        value={formData.last_name}
                        onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Phone Number:</span>
                    </label>
                    <input 
                        type="text"
                        className="input input-bordered"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Address:</span>
                    </label>
                    <input 
                        type="text"
                        className="input input-bordered"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email:</span>
                    </label>
                    <input 
                        type="email"
                        className="input input-bordered"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password:</span>
                    </label>
                    <input 
                        type="password"
                        className="input input-bordered"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                </div>
                <button className="btn btn-primary mr-4"
                    onClick={onUpdateSubmit}>Update</button>
                <button className="btn btn-secondary mt-4"
                    onClick={clear}>Clear</button>
                <label className="label">
                    <span className="label-text-alt">{statusMessage}</span>
                </label>
            </form>
        </div>
        <Nav />
    </div>

}