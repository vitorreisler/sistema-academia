import clientPromise from "../../lib/mongodb";

export default async function mostrarUsuarios(req, res){
try {
    const client = await clientPromise
    const db = client.db("sistema-academia")
    const user = await db.collection("users").find({}).toArray()
    return res.json(user)
} catch (err){
    console.error(err)

}
}