import clientPromise from "../../lib/mongodb";

export default async function matricularAluno(req, res) {



  
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

    console.log("Conexão com o banco de dados estabelecida.");

    // Verificar se todos os campos necessários estão presentes no req.body
    const { cpf, nome, idade } = req.body;
    if (!cpf || !nome || !idade) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    // Busca pelo CPF no banco de dados
    const existCPF = await db.collection("users").findOne({ cpf: cpf });

    console.log("Resultado da consulta de CPF:", existCPF);

    // Se o CPF não existir, matricula o aluno
    if (req.method === 'POST') {



    if (!existCPF) {
      const matricula = await db.collection("users").insertOne({ cpf, nome, idade });
      console.log("Novo usuário matriculado:", matricula);
      return res.status(200).json(matricula);
    }
  
  
  }



    res.setHeader('Allow', ['POST']);




    return (res.json("CPF EXISTENTE"))
    
  } catch (error) {
    console.error("Erro interno do servidor:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}
