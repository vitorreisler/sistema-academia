import clientPromise from "../../lib/mongodb";

export default async function buscarCPF(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("sistema-academia");
    const user = await db.collection("users").find({ cpf: req.body.cpf }).toArray();
    return res.json(user);
  } catch (err) {
    console.log(err);
  }
}
