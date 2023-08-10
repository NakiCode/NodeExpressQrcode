var express = require("express");
const path = require("path");
var cors = require("cors");
const bodyParser = require("body-parser");
const errorHandlerMiddleware = require('./middleware/errorInterceptor')

const app = express();
require("dotenv").config();

app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  if (req.method == "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

//app.use(keycloak.middleware());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/uploads", express.static("uploads"));
app.use(express.static(path.join(__dirname, "/uploads")));

const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("Ceci provient du serveur ");
});

// MIDDLEWARE
app.use(errorHandlerMiddleware)

app.listen(PORT, () => {
  console.log(`Le serveur s'exécute sur le port ${PORT}`);
});


