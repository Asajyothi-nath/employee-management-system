require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { sequelize } = require("./config/db");

// ROUTES
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
// APP
const app = express();

// MIDDLEWARES
app.use(express.json());

// This allows your server to accept secure API requests from any Vercel domain variant
app.use(cors()); 
/*app.use(cors({

    origin: "http://localhost:5173",

    credentials: true
}));*/




app.use(cookieParser());


// ROUTES
app.use("/api/auth",authRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/user",userRoutes);


// TEST ROUTE
app.get("/", (req, res) => {

    res.send("API Running...");
});


// DATABASE CONNECTION
sequelize.sync()

.then(() => {

    console.log("Database connected");

    // SERVER START
    app.listen(

        process.env.PORT,

        () => {

            console.log(

                `Server running on port ${process.env.PORT}`
            );
        }
    );
})

.catch((error) => {

    console.log(error);
});
