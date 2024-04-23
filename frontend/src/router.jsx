import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "./features/users/RegisterPage";
import TimetablePage from "./features/classes/TimetablePage";
import BookingPage from "./features/classes/BookingPage";
import LoginPage from "./features/users/LoginPage";
import UserBookingsList from "./features/users/UserBookingsList";
import XMLUploadPage from "./features/xml/XMLUploadPage";

const router = createBrowserRouter([
    {
        path: "/register",
        element: <RegisterPage />
    }, {
        path: "/login",
        element: <LoginPage />
    }, {
        path: "/timetable",
        element: <TimetablePage />
    }, {
        path: "/booking/:date/:activityId",
        element: <BookingPage />
    }, {
        path: "/bookings",
        element: <UserBookingsList />
    }, {
        path: "/upload",
        element: <XMLUploadPage />
    }
])

export default router