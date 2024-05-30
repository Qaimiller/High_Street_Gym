import { useState, useEffect } from "react";
import Header from "../../common/Header";
import Nav from "../../common/Nav.jsx";
import { useAuthentication } from "../authentication.jsx";
import { XMLUploader } from "./XMLUploader";
import Spinner from "../../common/Spinner.jsx"
import * as Locations from "../../api/locations.js"
import * as Activities from "../../api/activities.js"
import * as Users from "../../api/users.js"

export default function XMLUploadPage() {
    const [user] = useAuthentication()
    const [name, setName] = useState("")
    const [showSpinner, setShowSpinner] = useState(false)
    const [locations, setLocations] = useState([])
    const [locationMessage, setLocationMessage] = useState("")
    const [activities, setActivities] = useState([])
    const [activityMessage, setActivityMessage] = useState("")
    const [trainers, setTrainers] = useState([])
    const [trainerMessage, setTrainerMessage] = useState("")

    useEffect(() => {
        if (user) {
            setName(user.first_name)
        }
    }, [user])

    useEffect(() => {
        if (user) {
            setShowSpinner(true)
            Locations.getAllLocations().then(result => {
                setShowSpinner(false)
                if (result.length > 0) {
                    setLocations(result)
                } else {
                    setLocationMessage("There are no locations in the database!")
                }
            }).catch(error => {
                setShowSpinner(false)
                setLocationMessage(error)
            })
        }    
    }, [])

    useEffect(() => {
        if (user) {
            setShowSpinner(true)
            Activities.getAllActivities().then(result => {
                setShowSpinner(false)
                if (result.length > 0) {
                    setActivities(result)
                } else {
                    setActivityMessage("There are no activities in the database!")
                }
            }).catch(error => {
                setShowSpinner(false)
                setActivityMessage(error)
            })
        }    
    }, [])

    useEffect(() => {
        if (user) {
            setShowSpinner(true)
            Users.getAllTrainers().then(result => {
                setShowSpinner(false)
                if (result.length > 0) {
                    setTrainers(result)
                } else {
                    setTrainerMessage("There are no trainers in the database!")
                }
            }).catch(error => {
                setShowSpinner(false)
                setTrainerMessage(error)
            })
        }    
    }, [])

    return <div>
        <Header userFirstName={name}/>          
        <div className="flex flex-col items-center">
            <h2 className="text-xl text-center">Upload Classes</h2>
            <XMLUploader uploadUrl={"/classes/upload-xml"}/>
        </div>
        <div className="flex flex-col items-center">
            <h2 className="text-xl text-center">Upload Trainers</h2>
            <XMLUploader uploadUrl={"/users/upload-xml"}/>
        </div>
        <div className="max-w-md m-auto mb-10 bg-base-200"> 
            <div className="text-xl text-center">Location List</div>
                {showSpinner == true 
                    ? <Spinner />
                    : <table className="table mt-5">
                        <thead>
                            <tr>
                                <th>Location ID</th>
                                <th>Location Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {locations.map(location => 
                                <tr key={location.id}>
                                    <td>{location.id}</td>
                                    <td>{location.name}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                } 
            <span className="label-text-alt ml-3">{locationMessage}</span>
        </div> 
        <div className="max-w-md m-auto mb-10 bg-base-200"> 
            <div className="text-xl text-center">Activity List</div>
                {showSpinner == true 
                    ? <Spinner />
                    : <table className="table mt-5">
                        <thead>
                            <tr>
                                <th>Activity ID</th>
                                <th>Activity Name</th>
                                <th>Duration (min.)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activities.map(activity => 
                                <tr key={activity.id}>
                                    <td>{activity.id}</td>
                                    <td>{activity.name}</td>
                                    <td>{activity.duration}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                }
            <span className="label-text-alt ml-3">{activityMessage}</span>
        </div>          
        <div className="max-w-md m-auto mb-40 bg-base-200"> 
            <div className="text-xl text-center">Trainer List</div>
                {showSpinner == true 
                    ? <Spinner />
                    : <table className="table mt-5">
                        <thead>
                            <tr>
                                <th>Trainer ID</th>
                                <th>Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trainers.map(trainer => 
                                <tr key={trainer.id}>
                                    <td>{trainer.id}</td>
                                    <td>{(trainer.first_name ?? " ") + " " + (trainer.last_name ?? " ")}</td>
                                    <td>{trainer.email}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                }
            <span className="label-text-alt ml-3">{trainerMessage}</span>
        </div>      
        <Nav />
    </div>
}