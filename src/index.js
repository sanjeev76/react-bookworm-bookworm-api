import express from "express";
import path from "path";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import auth from "./routes/auth";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(bodyParser.json());
mongoose.set('useCreateIndex', true);
mongoose.connect("mongodb://localhost/bookworm", { useNewUrlParser: true });

app.use("/api/auth", auth);

app.get("/*", (_req,res) => {
    res.sendFile(path.join(__dirname, "index.html"));
} );

app.listen(8080, () => console.log("running on localhost:8080"));