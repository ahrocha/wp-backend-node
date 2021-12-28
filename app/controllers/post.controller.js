const Post = require("../models/post.model.js");

exports.findAll = (req, res) => {
  Post.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving posts."
      });
  	}
  	res.send(data);

  });
};

exports.findOne = (req, res) => {
  Post.findById(req.params.postId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Post with id ${req.params.postId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Post with id " + req.params.postId
        });
      }
    } else res.send(data);
  });
};

exports.findOneByName = (req, res) => {
  Post.findByName(req.params.name, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Post with route ${req.params.name}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Post with route " + req.params.name
        });
      }
    } else res.send(data);
  });
};
