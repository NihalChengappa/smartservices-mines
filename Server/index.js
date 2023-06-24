require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const checkposts = require("./routes/checkposts");
const transportdetails = require("./routes/transportdetails");
const eligibility = require("./routes/eligibility");
const quarry = require("./routes/quarry")
const routess=require("./routes/routess_route")
const routesss=require("./routes/routess")

// database connection
connection();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/checkposts", checkposts);
app.use("/api/transportdetails", transportdetails);
app.use("/api/eligibility", eligibility);
app.use("/api/quarry", quarry)
app.use("/api/checkposts",routess)
app.use("/api/routes",routesss)

const port = process.env.PORT || 8080;
app.listen(port,() => console.log(`Listening on port ${port}...`));