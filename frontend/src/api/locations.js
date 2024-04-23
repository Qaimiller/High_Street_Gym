import { API_URL } from "./api.js";

export async function getLocationById(locationId) {
    const response = await fetch(
        API_URL + `/locations/${locationId}`,
        {
            method: "GET",
            headers: {
                'Content-Type': "applications/json"
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