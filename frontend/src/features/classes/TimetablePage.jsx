import { useState, useEffect } from "react";
import DailyActivitySection from "../../common/DailyActivities.jsx";
import Header from "../../common/Header.jsx";
import Nav from "../../common/Nav.jsx";
import { useAuthentication } from "../authentication.jsx";

export default function TimetablePage() {  
    const [user] = useAuthentication()
    const [name, setName] = useState("")
    const days = []
    for (let i = 0; i < 14; i++) {
        let today = new Date()
        const day = new Date(today.setDate(today.getDate() + i)).toISOString().slice(0,10)
        days.push(day)
    }
    console.log(days)

    useEffect(() => {
        if (user) {
            setName(user.first_name)
        }
    }, [user])

    return <>
        <div className="flex-col">
            <Header userFirstName={name}/>
            <div className="ml-8 mb-40 flex flex-col">
                <div className="badge badge-outline mt-2 badge-neutral">Timetable for next 14 days</div>
                <div className="badge badge-outline mt-2 badge-secondary">Click on activity name to book</div>
                {days.map(day => <DailyActivitySection key={day} date={day}/>)} 
            </div>
            <Nav />
        </div>
    </>
}