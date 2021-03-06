const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");

var indexRouter = require("./routes/index");

const app = express();

//middleware
app.use(cors());
app.use(express.json());

app.use("/", indexRouter);

app.all("*", (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.status = "fail";
  err.statusCode = 404;

  next(err);
});

app.listen({ port: 5000 }, async () => {
  console.log(`Server running`);
  await sequelize.authenticate();
  console.log("Database connected!");
});
