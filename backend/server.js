const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const postsRoutes = require("./routes/posts-routes");
const authRoutes = require("./routes/users-routes");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use("/", postsRoutes);
app.use("/auth", authRoutes);

app.listen(5000);
