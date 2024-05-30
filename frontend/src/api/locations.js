import { API_URL } from "./api.js";

export async function getLocationById(locationId) {
    const response = await fetch(
        API_URL + `/locations/${locationId}`,
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            }
        }
    )
    const APIResponseObject = await response.json()

    if (APIResponseObject.location) {
        return APIResponseObject.location
    } else {
        return null
        // throw new Error("404 NOT FOUND")
    }    
}



export async function getAllLocations() {
    const response = await fetch(
        API_URL + `/locations`,
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            }
        }
    )
    const APIResponseObject = await response.json()
    if (APIResponseObject.status == 200) {
        return APIResponseObject.locations
    } else {
        return Promise.reject("Server Error")
    }
}