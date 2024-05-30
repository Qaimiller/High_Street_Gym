import { API_URL } from "./api.js";

export async function getActivityById(activityId) {
    const response = await fetch(
        API_URL + `/activities/${activityId}`,
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            }
        }
    )

    const APIResponseObject = await response.json()
    
    if (APIResponseObject.activity) {
        return APIResponseObject.activity
    } else {
        return null
        // throw new Error("404 NOT FOUND")
    }
}



export async function getAllActivities() {
    const response = await fetch(
        API_URL + `/activities`,
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            }
        }
    )
    const APIResponseObject = await response.json()
    if (APIResponseObject.status == 200) {
        return APIResponseObject.activities
    } else {
        return Promise.reject("Server Error")
    }
}