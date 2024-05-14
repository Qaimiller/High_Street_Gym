export default function Header({ userFirstName }) {
    return <div className="navbar flex-col">
        <div className="navbar-center">
            <a className="btn btn-ghost text-2xl" href="/">
                High Street Gym
            </a>
        </div>
        <div className="navbar-end">Hi, {userFirstName ? userFirstName : "there"}</div>
        <div className="divider m-0"></div>
    </div>
}