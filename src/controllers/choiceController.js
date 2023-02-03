import { choiceCollection, voteCollection } from "../config/db.js";
import { pollCollection } from "../config/db.js"
import dayjs from "dayjs";
import { ObjectId } from "mongodb";

export async function postChoice(req,res){
    const choice = req.body;
    const currentPool = await pollCollection.findOne({ _id: new ObjectId(choice.pollId) });

    if (!currentPool) {
      return res.status(404).send("Enquete não encontrada.");
    }

    const poolChoices = await choiceCollection.findOne({ title: choice.title });

    if (poolChoices) {
      return res.status(409).send("Já existe uma resposta com essa opção!");
    }

    const expireAt = await pollCollection.findOne({_id: new ObjectId(`${choice.pollId}`)});
    const expired = dayjs().format("DD/MM/YYYY HH:mm");

    if(expired > expireAt) {
      return res.status(403).send("Tempo da enquete expirou");
    }

    try{
    await choiceCollection.insertOne(choice);
    }catch (err) {return res.status(500)};

    res.status(201).send(`Opção adicionada à enquete com sucesso!`);
}


export async function getChoice(req, res) {
  const { id } = req.params;

  try {
    const poll = await choiceCollection.find({ pollId: id }).toArray();
    if(!poll.length) {
      return res.status(404).send('Enquete não encontrada');
    }
    res.send(poll);
    
  } catch(err) {
    console.log(err);
    res.status(500).send(err.message);
  }
  
}

export async function postVote(req, res) {
  const { id } = req.params;

  const vote = {
    createdAt: dayjs().format('YYYY-MM-DD HH:mm'), 
	  choiceId: id
  }

  try {
    const reponse = await choiceCollection.findOne({ _id: new ObjectId(id)} );

    if(!reponse) {
      return res.status(404).send('Opção nao existe ')
    }

    const searchPoll = await pollCollection.findOne({ _id: new ObjectId(reponse.pollId) });

    const expired = searchPoll.expiredAt
    const isExpired = dayjs().isAfter(expired, 'days');
    if(isExpired) {
      return res.status(403).send('Enquete expirada')
    }

    await voteCollection.insertOne(vote);
    
    res.sendStatus(201);
  } catch(err) {
    console.log(err)
    res.status(500).send(err.message);
  }
}
