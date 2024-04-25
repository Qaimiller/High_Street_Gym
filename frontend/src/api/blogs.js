import { API_URL } from "./api"

export async function createBlog(blogData) {
    const response = await fetch(
        API_URL + "/blogs/create",
        {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(blogData)
        }
    )
    const APIResponseObject = await response.json()
    if (APIResponseObject.status == 200) {
        return APIResponseObject.blog
    } else {
        return null
    }
}



export async function getAllBlogs() {
    const response = await fetch(
        API_URL + "/blogs",
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            }
        }
    )
    const APIResponseObject = await response.json()
    return APIResponseObject
}



export async function getAllBlogIds() {
    const response = await fetch(
        API_URL + "/blogs/allIds",
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            }
        }
    )
    const APIResponseObject = await response.json()
    if (APIResponseObject.status == 200) {
        return APIResponseObject.blogIds.map(item => item.id)
    }
}



export async function getBlogById(blogId) {
    const response = await fetch(
        API_URL + `/blogs/id/${blogId}`,
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            }
        }
    )
    const APIResponseObject = await response.json()
    if (APIResponseObject.status == 200) {
        return APIResponseObject.blog
    } else {
        return null
    }
}