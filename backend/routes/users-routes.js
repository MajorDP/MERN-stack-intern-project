const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const filePath = path.join("./data/", "users.json");

const readUsersFromFile = () => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading users file:", err);
    return [];
  }
};

const writeUsersToFile = (users) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing users file:", err);
  }
};

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const users = readUsersFromFile();
  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid email or password." });
  }

  res.json(user);
});

router.post("/register", (req, res) => {
  const { email, password, repeatPassword } = req.body;
  let users = readUsersFromFile();

  if (password !== repeatPassword) {
    return res
      .status(400)
      .json({ success: false, message: "Passwords do not match." });
  }

  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res
      .status(400)
      .json({ success: false, message: "Email already registered." });
  }

  const newUser = {
    userId: `${users.length + 1}`,
    email,
    password,
    userImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKFem0b3QKwZNYgZ3eCClFlnIlIn5V1nDJjw&s",
  };

  users.push(newUser);
  writeUsersToFile(users);

  res.status(201).json(newUser);
});

module.exports = router;
