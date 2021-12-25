const sql = require("./db.js");
const config = require("../config/config.js");

const Post = function(post) {
	this.date = post.date,
	this.title = post.title,
	this.name = post.name,
	this.content = post.content,
	this.status = post.status,
	this.tablePrefix = config.WP_TABLE_PREFIX
};

Post.findById = (postId, result) => {
	
	sql.query(`
			SELECT ID, post_title, post_date, post_name, post_content 
			FROM '${this.tablePrefix}'posts WHERE ID = ${postId} `, (err, res) => {
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
	sql.query(`
		SELECT ID, post_title, post_date, post_name, post_content 
		FROM '${this.tablePrefix}'posts WHERE post_name = '${postName}' 
		AND post_status = 'publish' LIMIT 1 `, (err, res) => {
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
	sql.query(`
		SELECT 
			p.ID, p.post_title, p.post_date, p.post_name,
			p.post_status, p.post_excerpt,
			p.post_modified, p.guid,
			u.display_name ,
			(SELECT guid FROM '${this.tablePrefix}'posts ppp
			LEFT JOIN '${this.tablePrefix}'postmeta wp ON wp.meta_value = ppp.ID
			WHERE wp.post_id = p.ID AND wp.meta_key = '_thumbnail_id' AND ppp.post_status = 'inherit'
			LIMIT 1
			) as image
		FROM '${this.tablePrefix}'posts p
		LEFT JOIN '${this.tablePrefix}'users u ON p.post_author = u.ID
		WHERE p.post_status = 'publish'
		ORDER BY ID DESC 
		LIMIT 10 ; `, (err, res) => {
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
