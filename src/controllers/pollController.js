import { pollCollection } from "../config/db.js"

export async function postPoll(req, res) {
    const addPoll = req.body

    try {
        await pollCollection.insertOne(addPoll)
        res.status(201).send(addPoll)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

export async function getPoll(req, res) {
    try {
        const listPolls = await pollCollection.find().toArray()
        res.send(listPolls)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}
