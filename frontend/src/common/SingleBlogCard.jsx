import { useState, useEffect } from "react"
import moment from "moment"
import * as Blogs from "../api/blogs.js"
import * as Users from "../api/users.js"

export function SingleBlogCard({ blogId }) {
    const [blog, setBlog] = useState({
        id: null,
        datetime: "",
        userName: "",
        title: "",
        content: ""
    })

    useEffect(() => {
        Blogs.getBlogById(blogId).then(result => {
            if (result) {
                Users.getUserNameById(result.user_id).then(name => {
                    if (name) {
                        setBlog({
                            blogId,
                            datetime: moment(result.datetime).format('lll'),
                            userName: name,
                            title: result.title,
                            content: result.content       
                        })
                    }
                })
                
            }
        })
    }, [])

    return <div className="card w-full shadow-xl">
        <div className="card-body">
            <h2 className="card-title">{blog.title}</h2>
            <span className="badge badge-primary">{blog.datetime + "  By " +blog.userName}</span>
            <p>{blog.content}</p>
        </div>
    </div>
}