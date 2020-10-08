const express = require("express")
const cors = require("cors")
const postRouter = require("./routes/posts_routes")

const app = express()
const port = 3000

app.use(cors())
app.use(express.json()) // using the ‘body-parser’ functionality

app.use("/posts", postRouter)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))