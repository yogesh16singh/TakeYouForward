import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

import serverRoutes from "./serverRoute.route.js";
import { sequelize } from "./db/model.db.js";

const app = express();

app.use(cors());

dotenv.config();

const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
  console.log(`server is listening on port: ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Routes Middleware
app.use("/api/", serverRoutes);
