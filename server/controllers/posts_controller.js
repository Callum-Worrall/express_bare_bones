const {
    getAllPosts, getPostById, addPost,
    getAllMongoPosts
} = require("../utils/post_utilities")

//#region Local

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

//#region DELETE Response Sender
const removePost = function(req, res) {
	let blogPosts = deletePost(req.params.id)
	res.send(blogPosts)
}
//#endregion

//#region UPDATE Response Sender
const updatePost = function(req) {
	try {
		let id = req.params.id
		if (!blogPosts[id]) throw "Post not found"
		blogPosts[id].title = req.body.title
		blogPosts[id].content = req.body.content
		blogPosts[id].category = req.body.category 
				? req.body.category 
				: blogPosts[id].category
		blogPosts[id].modified_date = Date.now()
		fs.writeFileSync(getDataFileRelativeToApp(dataFile), JSON.stringify(blogPosts))
		return blogPosts[id]
	} catch (error) {
		req.error = error
		return null
	}
}

const changePost = function(req, res) {
	let post = updatePost(req)
	if (post) {
		res.status(200)
		res.send(post)
	} else {
		res.status(500)
		res.send(`Error occurred: ${req.error}`)
	}
}
//#endregion

//#endregion

//#region Mongoose

//#region READ Response Senders
const getMongoPosts = function (req, res) {
    // execute the query from getAllPosts
    getAllMongoPosts(req).
    sort({
        modified_date: -1
    }).
    exec((err, posts) => {
        if (err) {
            res.status(500);
            return res.json({
                error: err.message
            });
        }
        res.send(posts);
    });
};
//#endregion

//#region CREATE Response Sender

//#endregion

//#region DELETE Response Sender

//#endregion

//#region UPDATE Response Sender

//#endregion

//#endregion

module.exports = {
    getPosts
    , getPost
    , makePost
    , removePost
    , changePost

    , getMongoPosts
    // , getMongoPost
    // , makeMongoPost
    // , removeMongoPost
    // , changeMongoPost
}
