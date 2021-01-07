const express = require("express");
const dotenv = require("dotenv");
const examRoute = require("./src/routes/examRoute")
const questionRoute = require("./src/routes/questionRoute")


//INITIAL SETUP
const server = express();
dotenv.config();
const port = process.env.PORT;

//MIDDLEWARES
server.use(express.json());
//ROUTES
server.use("/exams", examRoute)
server.use("/questions", questionRoute)

server.listen(port, () => {
	if (server.get("env") === "production")
		console.log("Server is running on CLOUD on PORT:", port);
	console.log("Server is running LOCALLY on PORT:", port);
});
