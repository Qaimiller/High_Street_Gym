import { API_URL } from "./api.js";

export async function getClassById(classId) {
    const response = await fetch(
        API_URL + `/classes/id/${classId}`,
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            }
        }
    )
    const APIResponseObject = await response.json()
    if (APIResponseObject.status == 200) {
        return APIResponseObject.gymClass
    } 
}



export async function getDailyActivityIds(date) {
    const startTime = new Date(new Date(date).setHours(10)).toISOString().slice(0,19).replace("T", " ")
    console.log(startTime)
    const endTime = new Date(new Date(date).setHours(33)).toISOString().slice(0,19).replace("T", " ")
    console.log(endTime)

    const response = await fetch(
        API_URL + `/classes/activityIds?start=${startTime}&end=${endTime}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
    )
    const APIResponseObject = await response.json()
    console.log(APIResponseObject.activityIds)
    return APIResponseObject.activityIds
}



export async function getDailyClassesByActivityId(date, activityId) {
    const startTime = new Date(new Date(date).setHours(0)).toISOString().slice(0,19).replace("T", " ")
    const endTime = new Date(new Date(date).setHours(23)).toISOString().slice(0,19).replace("T", " ")

    const response = await fetch(
        API_URL + `/classes/activityId/${activityId}?start=${startTime}&end=${endTime}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
    )
    const APIResponseObject = await response.json()
    // console.log(APIResponseObject.classes)
    if (APIResponseObject.classes) {
        return APIResponseObject.classes
    } else {
        return null
        // throw new Error("404 NOT FOUND")
    }
}



export async function getUpcomingClassesByTrainerId(trainerId) {
    const response = await fetch(
        API_URL + `/classes/trainerId/${trainerId}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
    )
    const APIResponseObject = await response.json()
    if (APIResponseObject.status == 200) {
        const now = new Date()
        return APIResponseObject.classes.filter((classSession) => {
            return new Date(classSession.datetime) >= now
        })
    } else {
        return Promise.reject(APIResponseObject.error)
    }
}