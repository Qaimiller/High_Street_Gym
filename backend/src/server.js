import express from "express"
import cors from "cors"
import fileUpload from "express-fileupload"
import userController from "./controllers/users.js"
import classController from "./controllers/classes.js"
import locationController from "./controllers/locations.js"
import activityController from "./controllers/activities.js"
import bookingController from "./controllers/bookings.js"
import blogController from "./controllers/blogs.js"

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
app.use("/locations", locationController)
app.use("/activities", activityController)
app.use("/bookings", bookingController)
app.use("/blogs", blogController)

// Start listening for API requests
app.listen(
    port, () => console.log("Express started on http://localhost:" + port)
)