const sql = require("./db.js");

const Post = function(post) {
	this.date = post.date,
	this.title = post.title,
	this.name = post.name,
	this.content = post.content,
	this.status = post.status
};


Post.findById = (postId, result) => {
	sql.query("SELECT ID, post_title, post_date, post_name, post_content FROM 541Pib644_posts WHERE ID = ${postId} AND post_status = 'publish' ", (err, res) => {
		if (err) {
			console.log("error", err);
			result(err, null);
			return;
		}

		if (res.length) {
			console.log("Found post", res[0]);
			result(null, res[0]);
			return;
		}

    	// not found Customer with the id
    	result({ kind: "not_found" }, null);
	});
};



Post.findByName = (postName, result) => {
	sql.query(`SELECT ID, post_title, post_date, post_name, post_content FROM 541Pib644_posts WHERE post_name = '${postName}' AND post_status = 'publish' LIMIT 1 `, (err, res) => {
		if (err) {
			console.log("error", err);
			result(err, null);
			return;
		}

		if (res.length) {
			res[0].post_content = res[0].post_content.replace(/\[(.*?)\]/g, "");
			result(null, res[0]);
			return;
		}

    	// not found Customer with the id
    	result({ kind: "not_found" }, null);
	});
};


Post.getAll = result => {
	sql.query("SELECT ID, post_title, post_date, post_name, post_status FROM 541Pib644_posts WHERE post_status = 'publish' ORDER BY post_date DESC ", (err, res) => {
		if (err) {
			console.log("error", err);
			result(err, null);
			return;
		}

		result(null, res);
		return;
	});
};

module.exports = Post;
