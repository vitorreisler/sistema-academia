import clientPromise from "../../lib/mongodb"
import jwt from "jsonwebtoken"



export default async function loginTreinador(req, res){
    const client = await clientPromise
    const db = client.db("sistema-academia")
    const loginTreinador = await db.collection("treinadores").findOne({email: req.body.email, cpf: req.body.cpf})
    
    if(!loginTreinador){
        return res.json("Treinador não encontrado")
    }

    if(loginTreinador === "Treinador não encontrado"){
        return null
    }
    const tokenCard = jwt.sign(loginTreinador, "x-auth-token")
    res.json(tokenCard)
    return

}