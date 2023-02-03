import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config()

const mongoClient = new MongoClient(process.env.MONGO_URI)

try {
    await mongoClient.connect()
    console.log("MongoDb Conectado")
} catch (err) {
    console.log(err)
}

export const db = mongoClient.db("drivenCracy");
export const pollCollection  = db.collection("poll");
export const choiceCollection  = db.collection("choice");
