import { Router } from "express"
import * as Locations from "../models/locations.js"

const locationController = Router()

locationController.get("/", (req, res) => {
    Locations.getAll().then(result => {
        res.status(200).json({
            status: 200,
            message: "Got all gym locations",
            locations: result
        })
    }).catch(error => {
        res.status(500).json({
            status: 500,
            message: "Server Error",
            error: error
        })
    })
})



locationController.get("/:id", (req, res) => {
    const locationId = req.params.id
    Locations.getById(locationId).then(result => {
        if (result) {
            res.status(200).json({
                status: 200,
                message: "Got location by id " + locationId,
                location: result
            })
        } else {
            res.status(404).json({
                status: 404,
                message: "No matching location with id " + locationId
            })
        }        
    }).catch(error => {
        res.status(500).json({
            status: 500,
            message: "Failed to get location by id " + locationId,
            error: error
        })
    })
})

export default locationController