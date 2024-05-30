import { useState, useEffect } from "react"
import moment from "moment"
import * as Users from "../../api/users.js"
import * as Classes from "../../api/classes.js"
import * as Activities from "../../api/activities.js"
import * as Locations from "../../api/locations.js"
import Nav from "../../common/Nav.jsx"
import Header from "../../common/Header.jsx"
import { useAuthentication } from "../authentication.jsx"
import Spinner from "../../common/Spinner.jsx"
import { useNavigate } from "react-router-dom"

export default function TrainerClassesList() {
    const [trainer, login, logout] = useAuthentication()
    const [name, setName] = useState("")
    const [classes, setClasses] = useState([])
    const now = new Date()
    const [showSpinner, setShowSpinner] = useState(false)
    const [statusMessage, setStatusMessage] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        if (trainer) {
            setName(trainer.first_name)
        }
    }, [trainer])

    useEffect(() => {
        if (trainer) {
            setShowSpinner(true)
            Classes.getUpcomingClassesByTrainerId(trainer.id).then(async classesResult => {
                if (classesResult.length > 0) {
                    const classesWithExtras = await Promise.all(classesResult.map(async classSession => {
                        const activity = await Activities.getActivityById(classSession.activity_id)
                        const trainerName = await Users.getUserNameById(classSession.trainer_user_id)
                        const location = await Locations.getLocationById(classSession.location_id)
                        const datetime = classSession.datetime
    
                        return Promise.resolve({
                            id: classSession.id,
                            activityName: activity.name,
                            trainerName,
                            locationName: location.name,
                            datetime: datetime,
                            datetimeString: moment(datetime).format('lll'),
                        })
                    }))
                    setShowSpinner(false)
                    setClasses(classesWithExtras)
                } else {
                    setShowSpinner(false)
                    setClasses([])
                    setStatusMessage("You have no running classes!")
                }   
            })
        }    
    }, [trainer])

    return <>
        <Header userFirstName={name}/>
        <div className="flex-col mx-1 mb-40">
            <div className="mb-5">
                <button className="btn"
                    onClick={(e)=>navigate("/bookings")}>Back to My Bookings</button>
            </div>
            <div className="text-xl text-center">My Upcoming Classes</div>
            {showSpinner == true 
                ? <Spinner />
                : <table className="table mt-5">
                    <thead>
                        <tr>
                            <th>Activity</th>
                            <th>Trainer</th>
                            <th>Location</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes.map(classSession => 
                            <tr key={classSession.id} 
                                className={new Date(classSession.datetime) < now ? "bg-neutral-content" : "hover"} 
                            >
                                <td>{classSession.activityName}</td>
                                <td>{classSession.trainerName}</td>
                                <td>{classSession.locationName}</td>
                                <td>{classSession.datetimeString}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            }
            <span className="label-text-alt ml-3">{statusMessage}</span>    
        </div>
        <Nav />
    </>
}