const { getAllPosts, getPostById, addPost } = require("../utils/utilities")

//#region READ Response Senders
const getPosts = function(req, res) {
	res.send(getAllPosts(req))
}

const getPost = function(req, res) {
	let post = getPostById(req)
	if (post) res.send(post)
	else {
		res.status(404)
		res.send(req.error)
	}
}
//#endregion

//#region CREATE Response Sender
const makePost = function(req, res) {
	let post = addPost(req)
	if (post) {
		res.status(201)
		res.send(post)
	} else {
		res.status(500)
		res.send(`Error occurred: ${req.error}`)
	}
}
//#endregion

module.exports = {
	getPosts,
    getPost,
    makePost
}
