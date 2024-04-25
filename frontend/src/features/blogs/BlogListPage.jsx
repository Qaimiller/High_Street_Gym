import { useEffect, useState } from "react";
import * as Blogs from "../../api/blogs.js"
import { SingleBlogCard } from "../../common/SingleBlogCard.jsx";
import Header from "../../common/Header.jsx";
import Nav from "../../common/Nav.jsx";
import { useNavigate } from "react-router-dom";

export default function BlogListPage() {
    const navigate = useNavigate()
    const [blogIds, setBlogIds] = useState([])
    const [statusMessage, setStatusMessage] = useState("")

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
            <Header />
            <button className="btn btn-secondary ml-10"
                onClick={e=>navigate("/blog_create")}>Add</button>
            <div>{statusMessage}</div>
            <div className="ml-8 mb-40 flex flex-col">
                {blogIds.map(id => <SingleBlogCard blogId={id} key={id} />)} 
            </div>
            <Nav />
        </div>
    </>
}