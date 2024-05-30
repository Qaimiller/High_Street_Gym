import { useState, useEffect } from "react"
import moment from "moment"
import * as Users from "../../api/users.js"
import * as Bookings from "../../api/bookings.js"
import * as Classes from "../../api/classes.js"
import * as Activities from "../../api/activities.js"
import * as Locations from "../../api/locations.js"
import Nav from "../../common/Nav.jsx"
import Header from "../../common/Header.jsx"
import { useAuthentication } from "../authentication.jsx"
import Spinner from "../../common/Spinner.jsx"
import { useNavigate } from "react-router-dom"

export default function UserBookingsList() {
    const [user, login, logout] = useAuthentication()
    const [name, setName] = useState("")
    const [bookings, setBookings] = useState([])
    const [selectedBookingId, setSelectedBookingId] = useState()
    const [deletedBookingId, setDeletedBookingId] = useState()
    const [statusMessage, setStatusMessage] = useState("")
    const now = new Date()
    const [showSpinner, setShowSpinner] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            setName(user.first_name)
        }
    }, [user])

    useEffect(() => {
        if (user) {
            setShowSpinner(true)
            Bookings.getBookingsByUserId(user.id).then(async bookingsResult => {
                if (bookingsResult.length > 0) {
                    const bookingsWithExtras = await Promise.all(bookingsResult.map(async booking => {
                        const gymClass = await Classes.getClassById(booking.class_id)
                        const activity = await Activities.getActivityById(gymClass.activity_id)
                        const trainerName = await Users.getUserNameById(gymClass.trainer_user_id)
                        const location = await Locations.getLocationById(gymClass.location_id)
                        const datetime = gymClass.datetime
    
                        return Promise.resolve({
                            id: booking.id,
                            activityName: activity.name,
                            trainerName,
                            locationName: location.name,
                            datetime: datetime,
                            datetimeString: moment(datetime).format('lll'),
                        })
                    }))
                    setShowSpinner(false)
                    setBookings(bookingsWithExtras)
                } else {
                    setShowSpinner(false)
                    setBookings([])
                    setStatusMessage("You have no bookings!")
                }    
            })
        }    
    }, [deletedBookingId, user])

    useEffect(() => {
        Bookings.deleteBookingById(selectedBookingId).then(result => {
            if (result) {
                setDeletedBookingId(selectedBookingId)
            }
        })
    }, [selectedBookingId])

    return <>
        <Header userFirstName={name}/>
        <div className="flex-col mb-40 mx-1">
            <div className="text-right mb-5">
                {user && user.role == "trainer"
                    ? <button className="btn btn-primary"
                        onClick={(e)=>navigate("/trainer_classes")}>Go to My Running Classes</button>
                    : null
                }
            </div>            
            <div className="text-xl text-center">My Bookings</div>
            {showSpinner == true 
                ? <Spinner />
                : <table className="table mt-5">
                    <thead>
                        <tr>
                            <th>Activity</th>
                            <th>Trainer</th>
                            <th>Location</th>
                            <th>Time</th>
                            <th>Cancel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(booking => 
                            <tr key={booking.id} 
                                className={new Date(booking.datetime) < now ? "bg-neutral-content" : "hover"} 
                            >
                                <td>{booking.activityName}</td>
                                <td>{booking.trainerName}</td>
                                <td>{booking.locationName}</td>
                                <td>{booking.datetimeString}</td>
                                <td><button className="btn btn-outline btn-sm btn-primary"
                                onClick={() => setSelectedBookingId(booking.id)}>X</button></td>    
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