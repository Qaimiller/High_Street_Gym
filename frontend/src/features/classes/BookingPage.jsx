import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import moment from "moment"
import * as Classes from "../../api/classes.js"
import * as Activities from "../../api/activities.js"
import * as Locations from "../../api/locations.js"
import * as Users from "../../api/users.js"
import * as Bookings from "../../api/bookings.js"
import Nav from "../../common/Nav.jsx"
import Header from "../../common/Header.jsx"

export default function BookingPage() {
    const navigate = useNavigate()
    const { date, activityId } = useParams()
    const [activity, setActivity] = useState({})
    const [classes, setClasses] = useState([])
    const [locations, setLocations] = useState([])
    const [times, setTimes] = useState([])
    const [trainers, setTrainers] = useState([])
    const [statusMessage, setStatusMessage] = useState("")
    const [user, setUser] = useState(null)

    const authenticationKey = localStorage.getItem("authenticationKey")

    useEffect(() => {
        Users.getUserByAuthenticationKey(authenticationKey).then(result => {
            if (result) {
                setUser(result)
            }
        })
    }, [])

    useEffect(() => {
        Activities.getActivityById(activityId).then(result => {
            if (result) {
                setActivity(result)
            }
        })
    }, [])

    useEffect(() => {
        Classes.getDailyClassesByActivityId(date, activityId).then(async classes => {
            const classesWithExtras = await Promise.all(classes.map(async item => {
                const location = await Locations.getLocationById(item.location_id)
                const trainer = await Users.getUserNameById(item.trainer_user_id)

                return Promise.resolve({
                    id: item.id,
                    time: moment(item.datetime).format('LT'),
                    location: location.name,
                    trainer
                })
            }))
            setClasses(classesWithExtras)
        })                   
    }, [])

    useEffect(() => {
        setLocations([...new Set(classes.map(item=>item.location))])
        setTrainers([...new Set(classes.map(item=>item.trainer))])
        setTimes([...new Set(classes.map(item=>item.time))])
    }, [classes])

    function narrowDownClassesByLocation(originClasses, location) {
        const narrowedClasses = originClasses.filter(item => 
            item.location == location)
        setClasses(narrowedClasses)
    }

    function narrowDownClassesByTime(originClasses, time) {
        const narrowedClasses = originClasses.filter(item => 
            item.time == time)
        setClasses(narrowedClasses)
    }

    function narrowDownClassesByTrainer(originClasses, trainer) {
        const narrowedClasses = originClasses.filter(item => 
            item.trainer == trainer)
        setClasses(narrowedClasses)
    }

    function onBookingSubmit(e) {
        e.preventDefault()
        if (classes.length > 1) {
            setStatusMessage("Please choose one class only.")
        } else {
            setStatusMessage("Submitting booking...")
            console.log(authenticationKey)
            const bookingData = {
                user_id: user.id,
                class_id: classes[0].id
            }
            console.log(bookingData)
            Bookings.createBooking(bookingData).then(result => {
                setStatusMessage("Booking created!")
            })
        }    
    }

    return <>
        <Header />
        <div className="mb-40">
            <h2 className="text-xl text-center mb-5">Create Booking</h2>
            <div className="text-center mb-5">
                <h3 className="badge badge-primary m-2">{activity.name ? activity.name + "(" : ""}
                    {activity.duration ? activity.duration + "min)" : ""}</h3>
                <h4 className="badge badge-neutral">{moment(date).format('dddd')} {moment(date).format('ll')}</h4>
            </div>
            
            <form className="grid justify-evenly gap-2" onSubmit={onBookingSubmit}>
                <select className="select select-bordered" defaultValue={"Locations"}
                    onChange={(e) => narrowDownClassesByLocation(classes, e.target.value)}>
                    <option disabled>Locations</option>
                    {locations.map(item => 
                        <option value={item} key={item}>{item}</option>
                    )}
                </select>
                <select className="select select-bordered" defaultValue={"Available Times"}
                    onChange={(e) => narrowDownClassesByTime(classes, e.target.value)}>
                    <option disabled>Available Times</option>
                    {times.map(item => 
                        <option value={item} key={item}>{item}</option>
                    )}
                </select>
                <select className="select select-bordered" defaultValue={"Available Trainers"}
                    onChange={(e) => narrowDownClassesByTrainer(classes, e.target.value)}>
                    <option disabled>Available Trainers</option>
                    {trainers.map(item => 
                        <option value={item} key={item}>{item}</option>
                    )}
                </select>
                <div className="my-2">
                    <button className="btn btn-primary mr-6">Book</button>
                    <button 
                        className="btn"
                        onClick={() => navigate("/timetable")}>Back</button>
                    <label className="label">
                        <span className="label-text-alt">{statusMessage}</span>
                    </label>
                </div>
                
            </form>
            
            <div>
                {classes.map(item => 
                    <div key={item.id}>{item.id}</div>
                )}
            </div>
        </div>
        <Nav />
    </>
}