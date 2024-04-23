import { db } from "../database.js"

export function newLocation(id, name) {
    return {id, name}
}



export async function getAll() {
    const [locationResults] = await db.query("SELECT * FROM locations")
    console.log(locationResults)
    return locationResults
}



export async function getById(locationId) {
    const [locationResult] = await db.query("SELECT * FROM locations WHERE id = ?", [locationId])
    if(locationResult.length > 0) {
        const location = locationResult[0]
        return newLocation(location.id, location.name)
    } else {
        return null
    }
}