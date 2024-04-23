import { Router } from "express"
import xml2js from "xml2js"
import * as fecha from "fecha"
import * as Classes from "../models/classes.js"


const classController = Router()

classController.get("/", (req, res) => {
    Classes.getAll().then(result => {
        res.status(200).json({
            status: 200,
            message: "Got all classes",
            classes: result
        })
    }).catch(error => {
        res.status(500).json({
            status: 500,
            message: "Failed to get all classes",
            error: error
        })
    })
})



classController.get("/id/:id", (req, res) => {
    const classId = req.params.id
    Classes.getById(classId).then(result => {
        res.status(200).json({
            status: 200,
            message: "Got gym class by id: " + classId,
            gymClass: result
        })
    }).catch(error => {
        res.status(404).json({
            status: 404,
            message: "Failed to find gym class by classId: " + classId,
            error: error
        })
    })
})



classController.get("/activityIds", (req, res) => {
    const startTime = req.query.start
    const endTime = req.query.end
    // const startTime = fecha.format(req.query.start, "YYYY-MM-DD HH:mm:ss")
    // const endTime = fecha.format(req.query.end, "YYYY-MM-DD HH:mm:ss")

    Classes.getActivityIdsByTimeRange(startTime, endTime).then(result => {
        res.status(200).json({
            status: 200,
            message: "Got activity IDs between " + startTime + " and " + endTime,
            activityIds: result
        })
    })
})



classController.get("/activityId/:activityId", (req, res) => {
    const startTime = req.query.start
    const endTime = req.query.end
    const id = req.params.activityId
    Classes.getByTimeRangeAndActivityId(startTime, endTime, id).then(result => {
        res.status(200).json({
            status: 200,
            message: "Got classes with activity_id " + id + " between " + startTime + " and " + endTime,
            classes: result
        })
    })
})



classController.post("/upload-xml", (req, res) => {
    if (req.files && req.files["xml-file"]) {     // This "xml-file" should comply with frontend formData.append type in body
        // Access the XML file as a string
        const XMLFile = req.files["xml-file"]     // There might be more than one file in req.files
        const file_text= XMLFile.data.toString()  // Change binary code to string

        // Set up XML parser
        const parser = new xml2js.Parser()
        // Parse the string in and get a promise
        parser.parseStringPromise(file_text)
            .then(data => {
                const classesUpload = data["classes-upload"]
                const classesUploadAttributes = classesUpload["$"]
                const operation = classesUploadAttributes["operation"]
                // Reach the nested children, access values of "classes" and inside "class" of JSON object literal 
                const classesData = classesUpload["classes"][0]["class-session"]   // Get an array

                if (operation == "insert") {
                    Promise.all(classesData.map(classData => {
                        // Convert the xml object into a model object,
                        // toString(): to make sure we work with text data, because it might be an xml element
                        const classModel = Classes.newClass(
                            null, 
                            classData.datetime.toString(),   
                            classData.location_id.toString(),
                            classData.activity_id.toString(),
                            classData.trainer_user_id.toString()
                        )  
                        // Return the promise of each creation query
                        return Classes.create(classModel)
                    })).then(results => {
                        res.status(200).json({
                            status:200,
                            message: "XML-Upload insert successful"
                        })
                    }).catch(error => {
                        res.status(500).json({
                            status: 500,
                            message: "XML-Upload failed on database operation - " + error
                        })
                    })
                } else if (operation = "update") {
                    Promise.all(classesData.map(classData => {
                        // Convert the xml object into a model object
                        const classModel = Classes.newClass(
                            classData.id.toString(),
                            classData.datetime.toString(),
                            classData.location_id.toString(),
                            classData.activity_id.toString(),
                            classData.trainer_user_id.toString()
                        )
                        // Return the promise of each creation query
                        return Classes.update(classModel)
                    })).then(results => {
                        res.status(200).json({
                            status: 200,
                            message: "XML-Upload update successful"
                        })
                    }).catch(error => {
                        res.status(500).json({
                            status: 500,
                            message: "XML-Upload failed on database operation - " + error
                        })
                    })
                } else {
                    res.status(400).json({
                        status: 400,
                        message: "XML contains invalid operation attribute value"
                    })
                }
            }).catch(error => {
                res.status(500).json({
                    status: 500,
                    message: "Error parsing XML - " + error
                })
            })
    } else {
        res.status(400).json({
            status: 400,
            message: "No xml file selected"
        })
    }
})

export default classController