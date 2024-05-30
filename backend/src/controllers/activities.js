import * as Activities from "../models/activities.js"
import { Router } from "express"

const activityController = Router()

activityController.get("/", (req, res) => {
    Activities.getAll().then(result => {
        res.status(200).json({
            status: 200,
            message: "Got all activities",
            activities: result
        })
    }).catch(error => {
        res.status(500).json({
            status: 500,
            message: "Server Error",
            error: error
        })
    })
})



activityController.get("/:id", (req, res) => {
    const activityId = req.params.id
    Activities.getById(activityId).then(result => {
        if (result) {
            res.status(200).json({
                status: 200,
                message: "Got activity by id " + activityId,
                activity: result
            })
        } else {
            res.status(404).json({
                status: 404,
                message: "No matching activity with id " + activityId
            })
        }    
    }).catch(error => {
        res.status(500).json({
            status: 500,
            message: "Failed to get activity by id " + activityId,
            error: error
        })
    })
})

export default activityController