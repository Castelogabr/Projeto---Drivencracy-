import { Router } from "express"
import { pollValidationSchema } from "../middlewares/validateSchema.js"
import { postPoll, getPoll} from "../controllers/pollController.js"


const pollRoutes = Router()

pollRoutes.post("/poll", pollValidationSchema, postPoll)
pollRoutes.get("/poll", getPoll)

export default pollRoutes