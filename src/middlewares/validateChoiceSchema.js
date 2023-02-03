import {choiceSchema} from "../schemas/choiceSchema.js";

export function choiceValidationSchema(req, res, next) {
  const validation = choiceSchema.validate(req.body);

  if(validation.error) {
    res.sendStatus(422);
    return
  }

  next();
}