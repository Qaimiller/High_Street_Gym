import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import * as Blogs from "../../api/blogs.js"
import { useAuthentication } from "../authentication.jsx"
import Header from "../../common/Header.jsx"
import Nav from "../../common/Nav.jsx"

export default function BlogCreatePage() {
    const navigate = useNavigate()
    const [user] = useAuthentication()
    const [formData, setFormData] = useState({
        title: "",
        content: ""
    })
    const [statusMessage, setStatusMessage] = useState("")
    const [name, setName] = useState("")

    useEffect(() => {
        if (user) {
            setName(user.first_name)
        }
    }, [user])

    function onBlogSubmit(e) {
        e.preventDefault()
        setStatusMessage("Posting blog...")
        const blogData = {
            user_id: user.id,
            title: formData.title,
            content: formData.content
        }
        Blogs.createBlog(blogData).then(result => {
            if (result) {
                setStatusMessage("Blog posted!")
                navigate("/blogs")
            } else {
                setStatusMessage("Failed to post a blog!")
            }
        })
    }

    return <>
        <Header userFirstName={name}/>
        {/* <div className="flex h-screen"> */}
            {/* <div className=""> */}
                <form className="flex-col items-center flex w-full" onSubmit={onBlogSubmit}>
                    <h2 className="text-3xl text-center mb-4">Post a new blog</h2>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Title:</span>
                        </label>
                        <input 
                            type="text"
                            placeholder="Give it a title..."
                            className="input input-bordered" 
                            value={formData.title}
                            onChange={e => setFormData({...formData, title: e.target.value})}
                        />
                        <label className="label">
                            <span className="label-text">Content:</span>
                        </label>
                        <textarea 
                            placeholder="Write your blog..."
                            className="textarea textarea-bordered h-36" 
                            value={formData.content}
                            onChange={e => setFormData({...formData, content: e.target.value})}>
                        </textarea>
                        <button className="btn btn-primary mt-4">Post</button>
                        <button 
                            className="btn btn-neutual mt-4"
                            onClick={() => navigate("/blogs")}>Cancel</button>
                        <label className="label">
                            <span className="label-text-alt">{statusMessage}</span>
                        </label>
                    </div>                    
                </form>
            {/* </div> */}
        {/* </div> */}
        <Nav />
    </>
}