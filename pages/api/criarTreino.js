import clientPromise from "../../lib/mongodb";

export default async function criarTreinos(req, res) {
    try {
      const { nivel, exercicios } = req.body;
      const client = await clientPromise;
      const db = client.db("sistema-academia");
      const treino = await db.collection("treinos").insertOne({
        nivel: nivel,
        exercicios: exercicios
      });

      return res.json(treino);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

}
