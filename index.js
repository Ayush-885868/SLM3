import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Router } from "./routes/routes.js";
import {Connection} from "./config/db.js";

import "./config/db.js";
//import mongoose from "mongoose";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.json());
app.use(cors());
dotenv.config({ path: "./config/.env" });

app.use('/contactmsyt', Router);

// Serve the frontend
app.use('/assets', express.static(path.join(__dirname,  "client", "dist", "assets")));
app.use(express.static(path.join(__dirname,  "client", "dist")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

//mongoose.connect(process.env.URI);
// mongoose.connect(process.env.URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverSelectionTimeoutMS: 5000, // Increase the timeout to 5 seconds
//   socketTimeoutMS: 45000, // Increase the socket timeout to 45 seconds
// })
// .then(() => {
//   console.log("MongoDB connected");
// })
// .catch((err) => {
//   console.error("MongoDB connection error:", err);
// });

// app.listen(process.env.PORT, () => {
//   console.log("server is running");
// });


(async () => {
  try {
    await Connection();
    console.log("Database connected successfully!");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    // Handle the database connection error appropriately (e.g., exit the process)
    process.exit(1); // Exit with a non-zero code to indicate failure
  }
})();



































 


