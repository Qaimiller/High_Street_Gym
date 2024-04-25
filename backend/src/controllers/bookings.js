import * as Bookings from "../models/bookings.js"
import { Router } from "express"
import * as fecha from "fecha"

const bookingController = Router()

bookingController.post("/create", (req, res) => {
    const bookingData = req.body
    const booking = Bookings.newBooking(
        null,
        bookingData.user_id,
        bookingData.class_id,
        fecha.format(new Date(), "YYYY-MM-DD HH:mm:ss")
        // new Date().toISOString().slice(0, 19).replace("T", " ")
    )
    // console.log(new Date().toISOString().slice(0, 19).replace("T", " "))

    Bookings.create(booking).then(booking => {
        res.status(200).json({
            status: 200,
            message: "New booking created",
            booking: booking
        })
    }).catch(error => {
        res.status(500).json({
            status: 500,
            message: "Booking failed to be created",
            error: error
        })
    })
})



bookingController.get("/userId/:userId", (req, res) => {
    const userId = req.params.userId
    Bookings.getByUserId(userId).then(result => {
        // the result can be empty array
        res.status(200).json({
            status: 200,
            message: "Got bookings for the user with id: " + userId,
            bookings: result
        })
    }).catch(error => {
        res.status(500).json({
            status: 500,
            message: "Failed to get bookings for user with id: " + userId,
            error: error
        })
    })
})



bookingController.delete("/id/:id", (req, res) => {
    const bookingId = req.params.id
    Bookings.deleteById(bookingId).then(result => {
        res.status(200).json({
            status: 200,
            message: "Deleted booking with bookingId: " + bookingId,
            result
        })
    }).catch(error => {
        res.status(404).json({
            status: 404,
            message: "Failed to delete booking with bookingId: " + bookingId,
            error
        })
    }) 
})


export default bookingController