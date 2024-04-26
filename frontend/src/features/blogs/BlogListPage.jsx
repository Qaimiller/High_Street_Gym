import { useEffect, useState } from "react";
import * as Blogs from "../../api/blogs.js"
import { SingleBlogCard } from "../../common/SingleBlogCard.jsx";
import Header from "../../common/Header.jsx";
import Nav from "../../common/Nav.jsx";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../authentication.jsx";

export default function BlogListPage() {
    const navigate = useNavigate()
    const [blogIds, setBlogIds] = useState([])
    const [statusMessage, setStatusMessage] = useState("")
    const [user] = useAuthentication()
    const [name, setName] = useState("")

    useEffect(() => {
        if (user) {
            setName(user.first_name)
        }
    }, [user])

    useEffect(() => {
        Blogs.getAllBlogIds().then(result => {
            if (result.length > 0) {
                setStatusMessage("")
                setBlogIds(result)
            } else {
                setStatusMessage("No blogs found.")
            }
        })
    }, [])

    return <>
        <div className="flex-col">
            <Header userFirstName={name}/>
            <button className="btn btn-secondary ml-4"
                onClick={e=>navigate("/blog_create")}>Add</button>
            <div>{statusMessage}</div>
            <div className="ml-2 mb-40 flex flex-col">
                {blogIds.map(id => <SingleBlogCard blogId={id} key={id} />)} 
            </div>
            <Nav />
        </div>
    </>
}