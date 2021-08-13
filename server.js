const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
	res.json({message: "Woelcome to my new code."});
});

app.listen(PORT, () => {
	console.log("Running port 3000");
});