module.exports = app => {
	const posts = require("../controllers/post.controller.js");

	app.get("/posts", posts.findAll);

	app.get("/post/:name", posts.findOneByName);

}