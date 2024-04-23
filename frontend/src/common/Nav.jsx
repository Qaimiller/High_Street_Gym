import { Link, useNavigate } from "react-router-dom";
import { useAuthentication } from "../features/authentication";

export default function Nav() {
    const [user, login, logout] = useAuthentication()
    const navigate = useNavigate()

    function onLogoutClick(e) {
        e.preventDefault()
        logout()
        navigate("/login")
    }

    return <div>
        <div className="btm-nav text-sm">
            <button onClick={(e)=>navigate("/timetable")}>
                <svg fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M19,4H17V3a1,1,0,0,0-2,0V4H9V3A1,1,0,0,0,7,3V4H5A3,3,0,0,0,2,7V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V7A3,3,0,0,0,19,4Zm1,15a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V12H20Zm0-9H4V7A1,1,0,0,1,5,6H7V7A1,1,0,0,0,9,7V6h6V7a1,1,0,0,0,2,0V6h2a1,1,0,0,1,1,1Z"></path></g></svg>
                <span>Timetable</span>
            </button>
            <button onClick={(e)=>navigate("/bookings")}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 6.00067L21 6.00139M8 12.0007L21 12.0015M8 18.0007L21 18.0015M3.5 6H3.51M3.5 12H3.51M3.5 18H3.51M4 6C4 6.27614 3.77614 6.5 3.5 6.5C3.22386 6.5 3 6.27614 3 6C3 5.72386 3.22386 5.5 3.5 5.5C3.77614 5.5 4 5.72386 4 6ZM4 12C4 12.2761 3.77614 12.5 3.5 12.5C3.22386 12.5 3 12.2761 3 12C3 11.7239 3.22386 11.5 3.5 11.5C3.77614 11.5 4 11.7239 4 12ZM4 18C4 18.2761 3.77614 18.5 3.5 18.5C3.22386 18.5 3 18.2761 3 18C3 17.7239 3.22386 17.5 3.5 17.5C3.77614 17.5 4 17.7239 4 18Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                <span>Bookings</span>
            </button>
            <button>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                <span>Profile</span>
            </button>
            {
                user && user.role == "manager" 
                    ? <button onClick={(e)=>navigate("/upload")}>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 16L12 12M12 12L16 16M12 12V21M20 16.7428C21.2215 15.734 22 14.2079 22 12.5C22 9.46243 19.5376 7 16.5 7C16.2815 7 16.0771 6.886 15.9661 6.69774C14.6621 4.48484 12.2544 3 9.5 3C5.35786 3 2 6.35786 2 10.5C2 12.5661 2.83545 14.4371 4.18695 15.7935" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                        <span>XML Import</span>
                    </button> 
                    : <button>
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" mirror-in-rtl="true" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill="#000000" fillRule="evenodd"> <path d="M11.01 2a4.93 4.93 0 0 1 3.19 1.16l.15.12a4.958 4.958 0 0 1 1.389-.27A5.479 5.479 0 0 1 21 8.5a5.485 5.485 0 0 1-5.326 5.49 5.472 5.472 0 0 1-6.4-.05c-.251.04-.505.06-.759.06a5.523 5.523 0 0 1-3.985-1.71c-2.283-2.4-2.017-6.842.893-8.614a5 5 0 0 1 2.59-.726h.06A4.98 4.98 0 0 1 11.01 2zm-4 5h5.995a1 1 0 0 0 0-2H7.014a1 1 0 1 0 0 2H7.01zm.004 3.975h9.992a1 1 0 0 0 0-2H7.014a1 1 0 1 0 0 2zM11.01 0a6.962 6.962 0 0 0-3.565.973 5.583 5.583 0 0 1-1.145.189 6.94 6.94 0 0 0-1.117.386A7.025 7.025 0 0 0 1.1 6.9a7.864 7.864 0 0 0 3.911 8.223A7.485 7.485 0 0 0 8.512 16h.251a7.5 7.5 0 0 0 3.746 1 7.386 7.386 0 0 0 3.825-1.051A7.441 7.441 0 0 0 23 8.5c0-.139 0-.278-.015-.407a7.524 7.524 0 0 0-7.172-7.082h-.16a6.569 6.569 0 0 0-.871.1A6.974 6.974 0 0 0 11.01 0z"></path> <circle cx="3.981" cy="19" r="1.999"></circle> <circle cx="1.999" cy="23" r="1"></circle> </g> </g></svg>
                        <span>Blog</span>
                    </button>
            }
            <button onClick={onLogoutClick}>
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect width="48" height="48" fill="white" fillOpacity="0.01"></rect> <path d="M23.9917 6L6 6L6 42H24" stroke="#000000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M33 33L42 24L33 15" stroke="#000000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M16 23.9917H42" stroke="#000000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                <span>Logout</span>
            </button>
        </div>
        
    </div>
}