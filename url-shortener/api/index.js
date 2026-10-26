import express from "express";
import cors from "cors";
import {nanoid} from "nanoid";
import mongoose from "mongoose";
import dotenv from "dotenv";
import {Redis} from "@upstash/redis";

dotenv.config();
const app= express();
app.use(cors());
app.use(express.json());

let isConnected = false;
const connectToMongoDB = async () => {
  if (isConnected) {
    console.log("MongoDB is already connected.");
    return;
  }
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI environment variable is missing!");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {maxPoolSize: 10});
    isConnected = true;
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }     
};

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
});;

const urlSchema = new mongoose.Schema({
  shortCode: { type: String, required: true, unique: true, index: true },
  longUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: '30d' },
});

const Url = mongoose.model("Url", urlSchema);

app.post("/api/shorten", async (req, res) => {
    const { longUrl } = req.body;
    if (!longUrl) {
      return res.status(400).json({ error: "Missing longUrl in request body - required" });
    }
    await connectToMongoDB();

    try {
        const shortCode = nanoid(6);
        const newUrl = new Url({ shortCode, longUrl });
        await newUrl.save();
        await redis.set(shortCode, longUrl, { ex: 86400 }); // Set expiration to 1 day (86400 seconds)
        const shortUrl = `${req.protocol}://${req.get("host")}/${shortCode}`;
        res.status(201).json({ shortCode, longUrl });
    } catch (error) {
        console.error("Error saving URL:", error);
        res.status(500).json({ error: "Internal server error post" });
    }
});
app.get("/:code", async (req,res) => {

    const { code } = req.params;
    if(code === "favicon.ico") {
        return res.status(204).end();
    }
    try {
        const cachedUrl = await redis.get(code);
        if (cachedUrl) {
            return res.redirect(cachedUrl);
        }

        await connectToMongoDB();
        const urlEntry = await Url.findOne({ shortCode: code });
        if(urlEntry) {
            await redis.set(code,urlEntry.longUrl, { ex: 86400 });
            return res.redirect(urlEntry.longUrl);
        }
        return res.status(404).json({ error: "URL not found" });
    } catch (error) {
        console.error("Error fetching URL:", error);
        return res.status(500).json({ error: "Internal server error get" });
    }
});
if (process.env.NODE_ENV !== 'production') {
    const PORT = 3000;
    app.listen(PORT, () => console.log(`🚀 Local test server alive on http://localhost:${PORT}`));
}

export default app;