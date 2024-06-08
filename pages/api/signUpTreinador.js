import clientPromise from "../../lib/mongodb";

export default async function signUpTreinador(req, res) {


  
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', 'https://sistema-academia.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    // Responder à requisição preflight
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }





  try {
    const client = await clientPromise;
    const db = client.db("sistema-academia");
    const treinador = await db
      .collection("treinadores")
      .findOne({ cpf: req.body.cpf });
    if (!treinador) {
      const treinadorMatriculado = await db
        .collection("treinadores")
        .insertOne({
          cpf: req.body.cpf,
          nome: req.body.nome,
          email: req.body.email,
        });




        res.setHeader('Allow', ['POST']);



        
      return res.json(treinadorMatriculado);
    }
    return res.json("Este treinador ja existe");
  } catch (err) {
    console.error(err);
  }
}
