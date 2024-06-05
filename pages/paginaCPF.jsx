import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { treinosPeito } from "../treinos/peito";
import { treinosCostas } from "../treinos/costas";
import { treinosOmbro } from "../treinos/ombro,";
import { treinosBiceps } from "../treinos/biceps";
import { treinosTriceps } from "../treinos/triceps";
import { treinosPernasFrontal } from "../treinos/pernasFrontal";
import { treinosPernasPosterior } from "../treinos/pernasPosterior";

const PaginaCPF = () => {
  const [cpf, setCPF] = React.useState(0);
  const [usuario, setUsuario] = React.useState("");
  const [treino, setTreino] = React.useState([]);
  const [nivelEscolhido, setNivelEscolhido] = React.useState("iniciante");

  const handleOnChange = (e) => {
    setCPF(e.target.value);
  };

  const handleSubmitBusca = async () => {
    const response = await axios.post(
      "http://localhost:3000/api/buscarCPF",
      { cpf: cpf },
      { headers: { "Content-Type": "application/json" } }
    );
    const { data } = response;
    setUsuario(data);
    return data;
  };

  const handleChangeSelectTreino = (e) => {
    switch (e.target.value) {
      case "peito":
        setTreino(treinosPeito);
        break;

      case "costas":
        setTreino(treinosCostas);
        break;
      case "ombro":
        setTreino(treinosOmbro)
        break;
      case "biceps":
        setTreino(treinosBiceps)
        break;
      case "triceps":
        setTreino(treinosTriceps)
        break;
      case "pernasAnterior":
        setTreino(treinosPernasFrontal)
        break;
      case "pernasPosterior":
        setTreino(treinosPernasPosterior)
        break;
    }
  };
  const handleChangeSelectNivel = (e) => {
    switch (e.target.value) {
      case "iniciante":
        setNivelEscolhido("iniciante");
        break;
      case "moderado":
        setNivelEscolhido("moderado");
        break;
      case "avancado":
        setNivelEscolhido("avancado");
        break;
    }
  };

  return (
    <section className="h-dvh flex flex-col items-center gap-3">
      <nav className="flex gap-3">
        <a href="/">home</a>
        <br />
        <a href="/matricula">Matricula</a>
      </nav>
      <h1 className="text-2xl ">Insira seu CPF</h1>
      <input
        onChange={handleOnChange}
        className="border border-black"
        type="number"
        name=""
        id="cpf"
      />
      <button
        onClick={handleSubmitBusca}
        disabled={cpf.length === 11 ? false : true}
        className="border border-black p-2 rounded"
      >
        Submit
      </button>
      {usuario && (
        <section className=" flex flex-col gap-3">
          <div className="border border-black p-4 rounded shadow-md">
            {!usuario[0]?.nome || !usuario[0]?.cpf || !usuario[0]?.idade ? (
              "Usuario não encontrado"
            ) : (
              <>
                <p>Nome:{usuario[0]?.nome}</p>
                <p>CPF:{usuario[0]?.cpf}</p>
                <p>Idade:{usuario[0]?.idade}</p>
                <div className="flex flex-col">
                  <hr className="border border-black my-3" />
                  {cpf && (
                    <div>
                      <h1 className="text-2xl my-2">
                        Qual seu treino de hoje ?
                      </h1>
                      <select onChange={handleChangeSelectTreino} name="" id="">
                        <option value="">-</option>
                        <option value="peito">Peito</option>
                        <option value="costas">Costas</option>
                        <option value="ombro">Ombro</option>
                        <option value="biceps">Biceps</option>
                        <option value="triceps">Triceps</option>
                        <option value="pernasAnterior">Pernas Anterior</option>
                        <option value="pernasPosterior">Pernas Posterior</option>
                      </select>
                      <hr className="border border-black my-3" />
                      <h1 className="text-2xl">Qual seu nivel de treino ?</h1>
                      <select onChange={handleChangeSelectNivel} name="" id="">
                        <option value="iniciante">Iniciante</option>
                        <option value="moderado">Moderado</option>
                        <option value="avancado">Avançado</option>
                      </select>
                      <hr className="border border-black my-3" />
                    </div>
                  )}

                  {nivelEscolhido && (
                    <div>
                      {treino.map((item, i) => {
                        // Verifica se o nível do treino atual é igual ao nível escolhido
                        if (item.nivel === nivelEscolhido) {
                          return (
                            <div key={i}>
                              <h2>Exercícios para o nível <strong>{nivelEscolhido.toLocaleUpperCase()}</strong>:</h2>
                              <ul className="my-4 flex flex-wrap justify-center">
                                {Object.keys(item).map((key) => {
                                  // Ignora a chave 'nivel' e renderiza os detalhes do exercício
                                  if (key !== "nivel") {
                                    return (
                                      <li
                                        key={key}
                                        className="my-5 border border-black p-4"
                                      >
                                        <strong>Nome:</strong> {item[key].nome}
                                        <br />
                                        <strong>Séries:</strong>{" "}
                                        {item[key].series}
                                        <br />
                                        <strong>Repetições:</strong>{" "}
                                        {item[key].repeticoes}
                                        <br />
                                        <strong>Descanso:</strong>{" "}
                                        {item[key].descanso}
                                        <br />
                                      </li>
                                    );
                                  }
                                })}
                              </ul>
                            </div>
                          );
                        }
                      })}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </section>
      )}
    </section>
  );
};

export default PaginaCPF;
