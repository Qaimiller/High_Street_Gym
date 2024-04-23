import * as Activities from "../models/activities.js"
import { Router } from "express"

const activityRouter = Router()

activityRouter.get("/:id", (req, res) => {
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

export default activityRouter