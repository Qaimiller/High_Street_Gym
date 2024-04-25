import { useNavigate } from "react-router-dom"
import background from "../../static/background.jpg"

export default function HomePage() {
    const navigate = useNavigate()
    return <>
        <div  className="flex h-screen bg-cover"
            style={{backgroundImage: 'url(https://images.pexels.com/photos/3927385/pexels-photo-3927385.jpeg)'}}
        >
            {/* style={{ backgroundImage: `url(${background})` }} */}
            <div className="hero-content flex-col m-auto">
                <h2>Welcome to</h2>
                <h2 className="text-4xl font-bold">High Steet Gym</h2>
                <div>
                    <button className="btn btn-primary mr-4"
                                        onClick={e=>navigate("/login")}>Login</button>
                    <button className="btn btn-secondary mt-4"
                        onClick={e=>navigate("/register")}>Sign up</button>
                </div>
            </div>  
        </div>    
    </>
}