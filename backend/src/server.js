import express from "express"
import cors from "cors"
import fileUpload from "express-fileupload"
import userController from "./controllers/users.js"
import classController from "./controllers/classes.js"
import locationRouter from "./controllers/locations.js"
import activityRouter from "./controllers/activities.js"
import bookingRouter from "./controllers/bookings.js"

const port = 8080
const app = express()

// Enable cross-origin resources sharing (CORS)
app.use(cors({
    // Allow all origins
    origin: true   
}))

app.use(express.json())

// Enable file upload support
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }
}))

// Import and use the routes defined by controllers
app.use("/users", userController)
app.use("/classes", classController)
app.use("/locations", locationRouter)
app.use("/activities", activityRouter)
app.use("/bookings", bookingRouter)

// Start listening for API requests
app.listen(
    port, () => console.log("Express started on http://localhost:" + port)
)