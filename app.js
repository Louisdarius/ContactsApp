const express = require("express"),
  variables = require("./configEnv"),
  database = require("./database"),
  cors = require("cors"),
  app = express();

/////////////////////////////////
//////// Middlewares ///////////
///////////////////////////////

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/users", require("./routes/user"));
app.use("/contacts", require("./routes/contact"));

app.listen(variables.port, () => console.log(variables.message));
