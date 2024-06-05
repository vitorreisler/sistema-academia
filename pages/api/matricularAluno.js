import clientPromise from "../../lib/mongodb";

export default async function matricularAluno(req, res) {
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
    if (!existCPF) {
      const matricula = await db.collection("users").insertOne({ cpf, nome, idade });
      console.log("Novo usuário matriculado:", matricula);
      return res.status(200).json(matricula);
    }
    
    return (res.json("CPF EXISTENTE"))
    // Se o CPF já existir, retorna a mensagem apropriada
   // return res.status(409).json("CPF já existe.");
  } catch (error) {
    console.error("Erro interno do servidor:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}
