const fs = require("fs")
const path = require("path");

// const testDataFile = "../data/posts/blog_posts.test.json"
// let jsonFile = fs.readFileSync(path.resolve(__dirname, "../data/posts/blog_posts.json"));
// let dataFile = JSON.stringify(jsonFile);
// let dataFile = "../data/posts/blog_posts.json"
let dataFile = "../../server/data/posts/blog_posts.json"
let blogPosts = require(dataFile)

//#region Local

const getDataFileRelativeToApp = function(file) {
	// Remove the ../ from the dataFile path for writing
	// because the writeFile looks for path relative to the app, not utilities.js
	return file.substring(file.lastIndexOf("../") + 3, file.length);
}

//#region READ

const getAllPosts = function(req) {
	return blogPosts;
}

const getPostById = function(req) {
	let post = blogPosts[req.params.id];
	if (post) return post;
	else req.error = "Post not found";
}

// Allows flexibility for testing
// Loads data from dataFile with fs
function loadFile(path) {
  blogPosts = JSON.parse(fs.readFileSync(path,'utf8'));
}

//#endregion

//#region CREATE

const addPost = function(req) {
	try {
		const date = Date.now();
		let blogPost = {
			title: req.body.title,
			create_date: date,
			modified_date: date,
			username: req.body.username,
			content: req.body.content,
			category: req.body.category || ""
		};
		blogPosts[getNextId()] = blogPost;
        fs.writeFileSync(getDataFileRelativeToApp(dataFile), JSON.stringify(blogPosts));
        // console.log(blogPost)
		return blogPost;
	}
	catch(error) {
		console.error(error);
		req.error = error;
		return null;
	}
}

// Returns the next available id for a blog post
function getNextId() {
	let sortedIds = Object.keys(blogPosts).sort()
	nextId = (sortedIds.length != 0) 
			? parseInt(sortedIds[sortedIds.length-1]) + 1
			: 1;
    return nextId;
}

//#endregion

//#region DELETE

const deletePost = function(id) {
	if (Object.keys(blogPosts).includes(id)) {
		//delete blogPosts[id];
		fs.writeFileSync(getDataFileRelativeToApp(dataFile), JSON.stringify(blogPosts));
	} 
	return blogPosts;
}

//#endregion

//#region UPDATE
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
//#endregion

//#endregion

//#region Mongo

const getAllMongoPosts = function(req) {
	return Post.find()
}

//#endregion

module.exports = {
    getDataFileRelativeToApp,
    
    getAllPosts,
    getPostById,
    addPost,
	loadFile,
    deletePost,
    updatePost,
    
    getAllMongoPosts
}