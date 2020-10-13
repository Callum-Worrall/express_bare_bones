const express = require("express")
const cors = require("cors")
const postRouter = require("./routes/posts_routes")
const mongoose = require("mongoose")

const port = 3000
const app = express()

app.use(cors())
app.use(express.json()) // includes the equivalent of the ‘body-parser’ functionality

const dbConn = "mongodb://localhost/blog_app"

//#region Mongoose / MongoDB
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
		} else {
			console.log("Connected to database!")
		}
	}
)
//#endregion

app.use("/posts", postRouter)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))