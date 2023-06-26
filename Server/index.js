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
const getroutes=require("./routes/get_route")
const employee=require("./routes/employee")
const getemployee=require("./routes/get_employee");
const Teams = require("./routes/teams");
const getTeams=require("./routes/get_Teams");
const dutytracker=require("./routes/dutytracker")
const routetracker=require("./routes/routetracker")
const sccc=require("./routes/sccc")
const lessee=require("./routes/lessee")
const permitmaster=require("./routes/permitmaster")
const getPermits=require("./routes/get_permitmaster")
const getSCCC=require("./routes/get_SCCC");
const getLessee=require("./routes/get_Lessees")
const getQuarry=require("./routes/get_Quarry")
const getDrivers=require("./routes/get_driver")
const getEligibilities=require("./routes/get_Eligibilities")
const putELigibilities=require("./routes/put_Eligibility")

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
app.use("/api/quarry", quarry);
app.use("/api/checkposts",routess);
app.use("/api/routes",routesss);
app.use("/api/routes",getroutes);
app.use("/api/employee",employee);
app.use("/api/employee",getemployee);
app.use("/api/teams",Teams)
app.use("/api/teams",getTeams)
app.use("/api/duties",dutytracker)
app.use("/api/routetrackers",routetracker)
app.use("/api/sccc",sccc)
app.use("/api/lessee",lessee)
app.use("/api/permitmaster",permitmaster)
app.use("/api/permitmaster",getPermits)
app.use("/api/sccc",getSCCC)
app.use("/api/lessee",getLessee)
app.use("/api/quarry",getQuarry)
app.use("/api/transportdetails",getDrivers)
app.use("/api/eligibility",getEligibilities)
app.use("/api/eligibility",putELigibilities)

const port = process.env.PORT || 8080;
app.listen(port,() => console.log(`Listening on port ${port}...`));