const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const PORT = process.env.PORT || 3000;

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
    methods: "GET, PUT"
}
app.use(corscorsOptions());
//app.options('*', cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
	res.json({message: "Welcome to my new code."});
});

require("./app/routes/post.routes.js")(app);

app.listen(PORT, () => {
	console.log("Running port 3000");
});