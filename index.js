import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import "./config/db.js";
//import mongoose from "mongoose";
import { Router } from "./routes/routes.js";

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

app.listen(process.env.PORT, () => {
  console.log("server is running");
});



































 


