const mongoose = require("mongoose");

// set up connection for test database
const dbConn = "mongodb://localhost/blog_app_test"

// Connect to the test database
function connectToDb(done) {
	// Connect to the database (same as we do in app.js)
	mongoose.connect(
		dbConn,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false
		},
		err => {
			if (err) {
				console.log("Error connecting to database", err)
				done()
			} else {
				console.log("Connected to database!")
				done()
			}
		}
	)
}

//#region Setup

// Set up test data before each test
beforeEach(async function() {
	// Load a test record in setupData
	// Use await so we can access the postId, which is used by some tests
	let post = await setupData()
	postId = post._id
})

function setupData() {
	let date = Date.now()
	let testPost = {}
	testPost.title = "Test post 1"
	testPost.username = "tester"
	testPost.create_date = date
	testPost.modified_date = date
	testPost.content = "This is the first test post"
	testPost.category = ""
	return Post.create(testPost)
}

//#endregion

// Use done to deal with asynchronous code - done is called when the hooks completes
before(done => connectToDb(done))

// Disconnect from the test database after all tests run. Call done to indicate complete.
after(done => {
	mongoose.disconnect(() => done())
})
