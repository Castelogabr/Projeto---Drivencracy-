import { pollSchema } from "../schemas/pollSchema.js";

export async function pollValidationSchema(req, res, next) {
    const body = req.body

    const validation = pollSchema.validate(body, { abortEarly: false })

    if (validation.error) {
        const err = validation.error.details.map((detail) => detail.message)
        res.status(422).send(err)
        return
    }
    if (!body.expireAt){
        const expired = new Date();
        expired.setDate(expired.getDate() + 30);
        body.expireAt = expired;
    }
    next()
}
