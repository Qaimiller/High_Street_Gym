import { db } from "../database.js"

export function newBlog(
    id,
    datetime,
    user_id,
    title,
    content
) {
    return {
        id,
        datetime,
        user_id,
        title,
        content
    }
}



export async function create(blog) {
    return db.query(`INSERT INTO blog_posts
        (datetime, user_id, title, content) VALUES (?, ?, ?, ?)
        `, [
            blog.datetime,
            blog.user_id,
            blog.title,
            blog.content
        ]
    ).then(result => {
        return {...blog, id: result[0].insertId}
    })
}



export async function getAll() {
    const [queryResult] = await db.query(`SELECT * FROM blog_posts ORDER BY datetime DESC`)
    return queryResult.map(blogResult => 
        newBlog(
            blogResult.id,
            blogResult.datetime,
            blogResult.user_id,
            blogResult.title,
            blogResult.content
        )
    )
}



export async function getAllIds() {
    const [queryResult] = await db.query(`SELECT id FROM blog_posts ORDER BY datetime DESC`)
    return queryResult
}



export async function getById(blogId) {
    const [queryResult] = await db.query(`SELECT * FROM blog_posts WHERE id = ?`, [blogId])

    if (queryResult.length > 0) {
        const result = queryResult[0]
        return newBlog(
            result.id,
            result.datetime,
            result.user_id,
            result.title,
            result.content
        )
    } else {
        return null
    }
}
