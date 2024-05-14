import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "./features/users/RegisterPage";
import TimetablePage from "./features/classes/TimetablePage";
import BookingPage from "./features/classes/BookingPage";
import LoginPage from "./features/users/LoginPage";
import UserBookingsList from "./features/users/UserBookingsList";
import XMLUploadPage from "./features/xml/XMLUploadPage";
import ProfilePage from "./features/users/ProfilePage";
import BlogCreatePage from "./features/blogs/BlogCreatePage";
import HomePage from "./features/HomePage";
import { SingleBlogCard } from "./common/SingleBlogCard";
import BlogListPage from "./features/blogs/BlogListPage";
import Spinner from "./common/Spinner";
import { RestrictedRoute } from "./common/RestrictedRoute";


const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />
    }, {
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
        element: <RestrictedRoute allowedRoles={["manager"]}>
                <XMLUploadPage />
        </RestrictedRoute>
    }, {
        path: "/profile",
        element: <ProfilePage />
    }, {
        path: "/blog_create",
        element: <BlogCreatePage />
    }, {
        path: "/card",
        element: <SingleBlogCard />
    }, {
        path: "/blogs",
        element: <BlogListPage />
    }, {
        path: "spinner",
        element: <Spinner />
    }
])

export default router