import { Router } from "express"
import { pollValidationSchema } from "../middlewares/validatePollSchema.js"
import { postPoll, getPoll, getResult} from "../controllers/pollController.js"


const pollRoutes = Router()

pollRoutes.post("/poll", pollValidationSchema, postPoll)
pollRoutes.get("/poll", getPoll)
pollRoutes.get("/poll/:id/result", getResult);

export default pollRoutes