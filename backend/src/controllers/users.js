import { Router } from "express"
import bcrypt from "bcryptjs"
import { v4 as uuid4 } from "uuid"
import xml2js from "xml2js"
import * as Users from "../models/users.js"

const userController = Router()

userController.post("/register", async (req, res) => {
    let userData = req.body
    // TODO: Implement request validation

    const userAlreadyExists = await Users.getByEmail(userData.email)
    if (userAlreadyExists) {
        res.status(409).json({
            status: 409,
            message: "Email already exists."
        })
        return 
    } 
    
    if (!userData.password.startsWith("$2a")) {
        userData.password = bcrypt.hashSync(userData.password)
    }

    const user = Users.newUser(
        null,
        userData.email,
        userData.password,
        "member",
        userData.firstName,
        userData.lastName,
        userData.phone,
        userData.address,
        null
    )

    Users.create(user).then(user => {
        res.status(200).json({
            status: 200,
            message: "Registration successful",
            user: user
        })
    }).catch(error => {
        res.status(500).json({
            status: 500,
            message: "Registration failed",
            error: error
        })
    })    
})



userController.get("/id/:id", (req, res) => {
    const userId = req.params.id
    Users.getById(userId).then(result => {
        if (result) {
            res.status(200).json({
                status: 200,
                message: "Got user by id " + userId,
                user: result
            })
        } else {
            res.status(404).json({
                status: 404,
                message: "No matching uer with id " + userId
            })
        }    
    }).catch(error => {
        res.status(500).json({
            status: 500,
            message: "Failed to get user by id " + userId,
            error: error
        })
    })
})



userController.get("/authentication/:authKey", (req, res) => {
    const key = req.params.authKey
    Users.getByAuthenticationKey(key).then(result => {
        if (result) {
            res.status(200).json({
                status: 200,
                message: "Got user by authentication_key: " + key,
                user: result
            })
        } else {
            res.status(404).json({
                status: 404,
                message: "No matching user with authentication_key: " + key
            })
        }
    }).catch(error => {
        res.status(500).json({
            status: 500,
            message: "Failed to get user by authentication_key: " + key,
            error: error
        })
    })
})



userController.post("/login", (req, res) => {
    const loginData = req.body
    // TODO: Implement request validation

    Users.getByEmail(loginData.email).then(user => {
        if (user) {
            if (bcrypt.compareSync(loginData.password, user.password)) {
                user.authentication_key = uuid4().toString()
                Users.update(user).then(result => {
                    res.status(200).json({
                        status: 200,
                        message: "User logged in",
                        authenticationKey: result.authentication_key
                    })
                })
            }
        } else {
            res.status(400).json({
                status: 400,
                message: "Invalid credentials"
            })
        }
    }).catch(error => {
        res.status(500).json({
            status: 500,
            message: "Login failed",
            error
        })
    })        
})



userController.post("/logout", (req, res) => {
    const authenticationKey = req.get("X-AUTH-KEY")
    if (authenticationKey) {
        Users.getByAuthenticationKey(authenticationKey).then(user => {
            if (user) {
                user.authentication_key = null
                Users.update(user).then(user => {
                    res.status(200).json({
                        status: 200,
                        message: "User logged out",
                        user
                    })
                }).catch(error => {
                    res.status(500).json({
                        status: 500,
                        message: "Failed to logout user",
                        error
                    })
                })
            } else {
                res.status(404).json({
                    status: 404,
                    message: "User not found with authentication_key: " + authenticationKey
                })
            }
        }).catch(error => {
            res.status(500).json({
                status: 500,
                message: "Failed to get user with authentication_key: " + authenticationKey,
                error
            })
        })
    } else {
        res.status(400).json({
            status: 400,
            message: "No X-AUTH-KEY found"
        })
    }
})



userController.patch("/:id", async (req, res) => {
    const userId = req.params.id
    const userData = req.body.user

    const userById = await Users.getById(userId)
    const userByEmail = await Users.getByEmail(userData.email)

    if (userById && userByEmail && userById != userByEmail) {
        res.status(409).json({
            status: 409,
            message: "Email has been used"
        })
        return
    }
    // TODO: Implement request validation

    // TODO: Enforce that users can only update their own user details. Do we have to?

    // Hash the password if it isn't already hashed
    if (userData.password && !userData.password.startsWith("$2a")) {
        userData.password = bcrypt.hashSync(userData.password)
    }

    const user = Users.newUser(
        userId,
        userData.email,
        userData.password,
        userData.role,
        userData.phone,
        userData.first_name,
        userData.last_name,
        userData.address,
        userData.authentication_key
    )

    Users.update(user).then(result => {
        res.status(200).json({
            status: 200,
            message: "Update successful",
            user: result
        })
    }).catch(error => {
        res.status(500).json({
            status: 500,
            message: "Failed to update user",
            error: error
        })
    })

})



userController.post("/upload-xml", (req, res) => {
    if (req.files && req.files["xml-file"]) {     // This "xml-file" should comply with frontend formData.append type in body
        const XMLFile = req.files["xml-file"]     // There might be more than one file in req.files
        const file_text= XMLFile.data.toString()  // Change binary code to string

        const parser = new xml2js.Parser()
        parser.parseStringPromise(file_text)
            .then(data => {
                const trainersUpload = data["trainers-upload"]
                const trainersUploadAttributes = trainersUpload["$"]
                const operation = trainersUploadAttributes["operation"]
                const trainersData = trainersUpload["trainers"][0]["trainer"]   // Get an array

                if (operation == "insert") {
                    Promise.all(trainersData.map(trainerData => {
                        const trainerModel = Users.newUser(
                            null, 
                            trainerData.email.toString(),   
                            trainerData.password.toString(),
                            trainerData.role.toString(),
                            trainerData.phone.toString(),
                            trainerData.first_name.toString(),
                            trainerData.last_name.toString(),
                            trainerData.address.toString(),
                            null
                        )  
                        return Users.create(trainerModel)
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
                    Promise.all(trainersData.map(trainerData => {
                        const trainerModel = Users.newUser(
                            trainerData.id.toString(),
                            trainerData.email.toString(),   
                            trainerData.password.toString(),
                            trainerData.role.toString(),
                            trainerData.phone.toString(),
                            trainerData.first_name.toString(),
                            trainerData.last_name.toString(),
                            trainerData.address.toString(),
                            null
                        )
                        return Users.update(trainerModel)
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

export default userController