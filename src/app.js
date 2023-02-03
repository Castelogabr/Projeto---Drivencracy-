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

const port = process.env.PORT
app.listen(port, () => console.log(`Servidor rodando na porta: ${port}`))
