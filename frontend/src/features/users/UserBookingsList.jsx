import { useState, useEffect } from "react"
import moment from "moment"
import * as Users from "../../api/users.js"
import * as Bookings from "../../api/bookings.js"
import * as Classes from "../../api/classes.js"
import * as Activities from "../../api/activities.js"
import * as Locations from "../../api/locations.js"
import Nav from "../../common/nav.jsx"
import Header from "../../common/Header.jsx"
import { useAuthentication } from "../authentication.jsx"

export default function UserBookingsList() {
    // const authenticationKey = localStorage.getItem("authenticationKey")
    // console.log(authenticationKey)
    // const [user, setUser] = useState(2)
    const [user, login, logout] = useAuthentication()

    const [bookings, setBookings] = useState([])
    const [selectedBookingId, setSelectedBookingId] = useState()
    const [deletedBookingId, setDeletedBookingId] = useState()

    useEffect(() => {
        if (user) {
            Bookings.getBookingsByUserId(user.id).then(async bookingsResult => {
                if (bookingsResult) {
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
                            datetime: moment(datetime).format('lll')
                        })
                    }))
                    setBookings(bookingsWithExtras)
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
        <Header />
        <div className="text-xl flex justify-center mb-2">My Bookings</div>
        <table className="table mb-10">
            <thead>
                <tr>
                    <th>Activity</th>
                    <th>Trainer</th>
                    <th>Location</th>
                    <th>Time</th>
                </tr>
            </thead>
            <tbody>
                {bookings.map(booking => 
                    <tr key={booking.id} className="hover">
                        <td>{booking.activityName}</td>
                        <td>{booking.trainerName}</td>
                        <td>{booking.locationName}</td>
                        <td>{booking.datetime}</td>
                        <td><button className="btn btn-sm"
                        onClick={() => setSelectedBookingId(booking.id)}>X</button></td>    
                    </tr>
                )}
            </tbody>
        </table>
        <Nav />
    </>
}