import { useEffect, useState } from "react";
import * as Blogs from "../../api/blogs.js"
import { SingleBlogCard } from "../../common/SingleBlogCard.jsx";
import Header from "../../common/Header.jsx";
import Nav from "../../common/Nav.jsx";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../authentication.jsx";
import Spinner from "../../common/Spinner.jsx";

export default function BlogListPage() {
    const navigate = useNavigate()
    const [blogIds, setBlogIds] = useState([])
    const [statusMessage, setStatusMessage] = useState("")
    const [user] = useAuthentication()
    const [name, setName] = useState("")
    const [showSpinner, setShowSpinner] = useState(false)

    useEffect(() => {
        if (user) {
            setName(user.first_name)
        }
    }, [user])

    useEffect(() => {
        setShowSpinner(true)
        Blogs.getAllBlogIds().then(result => {
            if (result.length > 0) {
                setShowSpinner(false)
                setStatusMessage("")
                setBlogIds(result)
            } else {
                setStatusMessage("No blogs found.")
            }
        })
    }, [])

    return <>
        <Header userFirstName={name}/>
        <h1 className="text-xl text-center mb-10">Blogs</h1>
        <div className="flex flex-col items-center mx-2">
            <button className="btn btn-wide btn-secondary"
                onClick={e=>navigate("/blog_create")}>Add</button>
            <div>{statusMessage}</div>
            {showSpinner == true
                ? <Spinner />
                : <div className="mb-40 flex flex-col">
                    {blogIds.map(id => <SingleBlogCard blogId={id} key={id} />)} 
                </div>           
            }           
        </div>
        <Nav />
    </>
}