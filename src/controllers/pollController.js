import { choiceCollection, pollCollection, voteCollection } from "../config/db.js"
import { ObjectId } from "mongodb";

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

export async function getResult(req,res){
    const { id } = req.params
    try {
        const poll = await pollCollection.findOne({ _id: new ObjectId(id) })
        const choices = await choiceCollection.find({ pollId: id}).toArray()
        const votes = await voteCollection.find({}).toArray()

        const voteTotal = []
        let cont1 = 0
        let idChoice
        let choiceTitle

        votes.map( vote => {
            let idVoto = vote.choiceId
            for (let i = 0; i < choices.length; i++) {
                idChoice = choices[i]._id
                if (idChoice == idVoto){
                    voteTotal.push(idChoice)
                    choiceTitle = choices[i].title
                }

            }
        })

        for (let i = 0; i < voteTotal.length; i++){
            if(voteTotal[i] === voteTotal[i+1]){
                cont1++
            }
        }

        let votos = [cont1]
        let maxVotos = Math.max(...votos)

        const result = {
            _id: poll._id,
            title: poll.title,
            expireAt: poll.expireAt,
            result: {
                title: choiceTitle,
                votes: maxVotos
            }
        }

        res.send(result)
        
    } catch (err) {
        return res.status(500).send(err.message)
    }
}