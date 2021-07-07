const express = require("express");
const cors = require('cors');

const { initializeDBConnection } = require("./db/db.connect.js");
const {routeNotFoundHandler} = require("./middlewares/routeNotFoundHandler.js");
const {errorHandler} = require("./middlewares/errorHandler.js");

const signupRouter = require("./v1.0/routes/signup.route.js");
const loginRouter = require("./v1.0/routes/login.route.js");
const productRouter = require("./v1.0/routes/product.routes.js");
const campaignRouter = require("./v1.0/routes/campaign.routes.js");

// Called before any route handler
initializeDBConnection();

const PORT = process.env['PORT'];
const app = express();

// Middlewares
app.use(cors());

// Routes
app.use("/api/v1/signup", signupRouter);
app.use("/api/v1/login", loginRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/campaigns", campaignRouter);

app.get('/',(req, res) => {
  res.send("EMART Backend");
});

/** 
 * Note: DO NOT MOVE.
 * 404 Route Not Found Handler
 * Error Handler
*/
app.use('/', routeNotFoundHandler);
app.use('/', errorHandler);

app.listen(PORT, () => {
  console.log("Server is up and running");
});