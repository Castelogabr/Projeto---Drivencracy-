import { Router } from "express"
import { choiceValidationSchema } from "../middlewares/validateChoiceSchema.js"
import { postChoice, getChoice } from "../controllers/choiceController.js";


const choiceRoutes = Router()

choiceRoutes.post("/choice", choiceValidationSchema, postChoice);
choiceRoutes.get('/poll/:id/choice', getChoice)

export default choiceRoutes