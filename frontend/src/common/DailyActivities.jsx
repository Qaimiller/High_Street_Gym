import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import * as Classes from "../api/classes"
import * as Activities from "../api/activities"

export default function DailyActivitySection({date}) {
    const navigate = useNavigate()
    const days = {
        0: "Sunday",
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday"
    }
    const dayNumber = (new Date(date)).getDay()
    const day = days[dayNumber]
    const dateString = (new Date(date)).toLocaleDateString()
    const [activities, setActivities] = useState([])

    useEffect(() => {
        Classes.getDailyActivityIds(date).then(async activityIds => {
            // fetch activity for each activityId
            const activityArray = await Promise.all(activityIds.map(async id => {
                const activity = await Activities.getActivityById(id)
                return activity
            }))

            setActivities(activityArray)
        })
            
    }, [])

    return <div>
        <div>
            <h2 className="card-title mt-8">{day + " - " + dateString}</h2>
        </div>
        <div>
            {activities.map(item => 
                <button 
                    onClick={() => navigate("/booking/" + date + "/" + item.id)}
                    className="btn btn-outline btn-primary block mt-3" key={item.name}>{item.name}</button>
            )}
        </div>
    </div>
}