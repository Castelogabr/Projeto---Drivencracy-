import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pollRoutes from "./routes/pollRoute.js";
import choiceRoutes from "./routes/choiceRoute.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(pollRoutes);
app.use(choiceRoutes)


app.listen(5000, () => console.log(`Servidor rodando na porta 5000`))
