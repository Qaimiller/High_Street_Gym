import * as Blogs from "../models/blogs.js"
import { Router } from "express"
import * as fecha from "fecha"

const blogController = Router()

blogController.post("/create", (req, res) => {
    const blogData = req.body
    const blog = Blogs.newBlog(
        null,
        fecha.format(new Date(), "YYYY-MM-DD HH:mm:ss"),
        blogData.user_id,
        blogData.title,
        blogData.content
    )
    Blogs.create(blog).then(result => {
        res.status(200).json({
            status: 200,
            message: "New blog created",
            blog: result
        })
    }).catch(error => {
        res.status(500).json({
            status: 500,
            message: "Blog failed to be created",
            error: error
        })
    })
})



blogController.get("/", (req, res) => {
    Blogs.getAll().then(result => {
        res.status(200).json({
            status: 200,
            message: "Got all blogs",
            blogs: result
        })
    }).catch(error => {
        res.status(500).json({
            status: 500,
            message: "Server error",
            error: error
        })
    })
})



blogController.get("/allIds", (req, res) => {
    Blogs.getAllIds().then(result => {
        res.status(200).json({
            status: 200,
            message: "Got all blog ids",
            blogIds: result  // array of objects containing id as only key
        })
    }).catch(error => {
        res.status(500).json({
            status: 500,
            message: "Server error",
            error: error
        })
    })
})



blogController.get("/id/:id", (req, res) => {
    const blogId = req.params.id
    Blogs.getById(blogId).then(result => {
        if (result) {
            res.status(200).json({
                status: 200,
                message: "Got blog by id " + blogId,
                blog: result
            })
        } else {
            res.status(404).json({
                status: 404,
                message: "No matching blog with id " + blogId
            })
        }
    }).catch(error => {
        res.status(500).json({
            status: 500,
            message: "Failed to get user by id " + userId,
            error: error
        })
    })
})



export default blogController