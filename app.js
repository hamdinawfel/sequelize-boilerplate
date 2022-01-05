const express = require("express");

const { sequelize, User, Post } = require("./models");

const app = express();

//middleware
app.use(express.json());
// routes
// create user
app.post("/users", async (req, res) => {
  const { name, email, role } = req.body;

  try {
    const user = await User.create({ name, email, role });
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
});
// get users
app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    return res.json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Oops! Something was wrong" });
  }
});
// get user by id
app.get("/users/:uuid", async (req, res) => {
  const { uuid } = req.params.uuid;
  try {
    const user = await User.findOne({ uuid, include: "posts" });
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Oops! Something was wrong" });
  }
});

// delete user
app.delete("/users/:uuid", async (req, res) => {
  const { uuid } = req.params.uuid;
  try {
    const user = await User.findOne({ uuid });
    user.destroy();
    return res.json({ message: "User deleted!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Oops! Something was wrong" });
  }
});
// update user
app.put("/users/:uuid", async (req, res) => {
  const { name, email, role } = req.body;
  try {
    const user = await User.findOne({ where: { uuid: req.params.uuid } });

    user.name = name;
    user.email = email;
    user.role = role;

    await user.save();
    return res.status(200).json({ message: "user updated" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Oops! Something was wrong" });
  }
});

// create post
app.post("/posts", async (req, res) => {
  const { userUuid, body } = req.body;
  try {
    const user = await User.findOne({ where: { uuid: userUuid } });
    const post = await Post.create({ body, userId: user.id });
    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

// get posts with ther creator (user)
app.get("/posts", async (req, res) => {
  try {
    // const posts = await Post.findAll({
    //   include: [{ model: User, as: "user" }],
    // });
    //Or
    const posts = await Post.findAll({
      include: "user",
    });
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

app.listen({ port: 5000 }, async () => {
  console.log(`Server running`);
  await sequelize.authenticate();
  console.log("Database connected!");
});
