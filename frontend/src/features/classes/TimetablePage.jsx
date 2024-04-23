import DailyActivitySection from "../../common/DailyActivities.jsx";
import Header from "../../common/Header.jsx";
import Nav from "../../common/nav.jsx";

export default function TimetablePage() {
    const days = []
    for (let i = 0; i < 18; i++) {
        let today = new Date()
        const day = new Date(today.setDate(today.getDate() + i)).toISOString().slice(0,10)
        days.push(day)
    }
    console.log(days)
    return <>
        <Header />
        <div className="ml-6 mb-20">
            <div className="badge mt-2 badge-neutral">Timetable for next 18 days</div>
            {days.map(day => <DailyActivitySection key={day} date={day}/>)} 
        </div>
        <Nav />
    </>
}