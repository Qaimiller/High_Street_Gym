import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../features/authentication";
import Header from "./Header";
import Nav from "./Nav";

export function RestrictedRoute({ allowedRoles = [], children }) {
    const [user] = useAuthentication()
    const navigate = useNavigate()
    const userIsAuthorised = user && allowedRoles.includes(user.role)

    return userIsAuthorised
        ? children
        : <>
            <Header />
            <div className="flex flex-col justify-center items-center gap-4">
                <h2 className="text-4xl">Not authorised</h2>
                <span className="text-xl">Access role is not permitted to view this page.</span>
                <button className="btn" onClick={(e)=>navigate(-1)}>Back</button>
            </div>
        </>
}