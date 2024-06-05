import clientPromise from "../../../lib/mongodb";


export default async function handler(req, res){
    try {
        const client = await clientPromise
        const db = client.db("sistema-academia")
        const deleteUser = await db.collection("users").findOneAndDelete({name: req.body.name})
        return res.json(deleteUser)
    } catch (err) {
        console.error(err)
    }
}