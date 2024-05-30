import { db } from "../database.js"

export function newActivity(
    id,
    name,
    description,
    duration
) {
    return {
        id,
        name,
        description,
        duration
    }
}



export async function getAll() {
    const [activityResults] = await db.query("SELECT * FROM activities")
    return activityResults
}




export async function getById(activityId) {
    const [queryResult] = await db.query("SELECT * FROM activities WHERE id = ?", [activityId])
    if(queryResult.length > 0) {
        const result = queryResult[0]
        return newActivity(
            result.id,
            result.name,
            result.description,
            result.duration
        )
    } else {
        return null
    }
}