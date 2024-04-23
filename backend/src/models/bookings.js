import { db } from "../database.js"

export function newBooking(
    id,
    user_id,
    class_id,
    created_datetime
) {
    return {
        id,
        user_id,
        class_id,
        created_datetime
    }   
}



export async function create(booking) {
    return db.query(`INSERT INTO bookings 
        (user_id, class_id, created_datetime)
        VALUES (?, ?, ?)
        `, [
                booking.user_id,
                booking.class_id,
                booking.created_datetime
            ]
    ).then(result => {
        console.log(result)
        return {...booking, id: result[0].insertId}
    })
}



export async function getByUserId(userId) {
    const [bookingsResults] = await db.query(`SELECT * FROM bookings WHERE user_id = ?`, [userId])
    if (bookingsResults.length > 0) {
        return bookingsResults.map(bookingResult => 
            newBooking(
                bookingResult.id,
                bookingResult.user_id,
                bookingResult.class_id,
                bookingResult.created_datetime
            )
        )
    } else {
        return []
    }   
}



export async function deleteById(bookingId) {
    const [queryResult] = await db.query(`DELETE FROM bookings WHERE id = ?`, [bookingId])
    if (queryResult.affectedRows > 0) {
        return queryResult
    } else {
        return Promise.reject("No bookings matched.")
    }
    // Result example: 
    //   [
    //     {
    //       "fieldCount": 0,
    //       "affectedRows": 1,         // OR 0
    //       "insertId": 0,
    //       "info": "",
    //       "serverStatus": 2,
    //       "warningStatus": 0,
    //       "changedRows": 0
    //     },
    //     null
    //   ]
}