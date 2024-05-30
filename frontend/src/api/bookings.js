import { API_URL } from "./api";


export async function createBooking(bookingData) {
    const response = await fetch(
        API_URL + "/bookings/create",
        {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                // 'X-AUTH-KEY': authenticationKey
            },
            body: JSON.stringify(bookingData)
        }
    )
    const APIResponseObject = await response.json()
    if (APIResponseObject.status == 200) {
        return APIResponseObject.booking
    } else {
        return Promise.reject(APIResponseObject.message)
    }
}



export async function getBookingsByUserId(userId) {
    const response = await fetch(
        API_URL + `/bookings/userId/${userId}`,
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            }
        }
    )

    const APIResponseObject = await response.json()
    if (APIResponseObject.status == 200) {
        return APIResponseObject.bookings
    } else {
        return null
    }
}



export async function deleteBookingById(bookingId) {
    if (bookingId > 0) {  // Check bookingId>0 to avoid initial implementation of useEffect
        const response = await fetch(
            API_URL + `/bookings/id/${bookingId}`,
            {
                method: "DELETE",
                headers: {
                    'Content-Type': "application/json"
                }
            }
        )
        const APIResponseObject = await response.json()
        if (APIResponseObject.status == 200) {
            return true
        } else {
            return false
        }
    }    
}