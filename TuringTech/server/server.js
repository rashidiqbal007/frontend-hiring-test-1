const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express();
require('dotenv').config()
const dbConfig = require("./config/dbconfig.js")



app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
// to destructure json
app.use(express.json());
const AuthRoute = require("./routes/AuthRoute")
// const adminRoute = require("./routes/adminRoutes")
// const doctorRoute = require("./routes/doctorRoutes")



// whenever api req is coming with word api/user, go and search api endpoints in the userRoute
app.use("/auth", AuthRoute);

// app.use("/api/admin", adminRoute);

// app.use("/api/doctor", doctorRoute);



const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Node Server running on port ${port}`)
})





