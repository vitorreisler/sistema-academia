import Head from "next/head";
import clientPromise from "../lib/mongodb";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import axios from "axios";
import React from "react";

type ConnectionStatus = {
  isConnected: boolean;
};

type Usuario = {
  cpf: number;
  nome: string;
  idade: number;
  _id: any;
};

export const getServerSideProps: GetServerSideProps<
  ConnectionStatus
> = async () => {
  try {
    await clientPromise;
    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
};

export default function Home({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [todosUsuarios, setTodosUsuarios] = React.useState([]);

  const handleSubmit = async () => {
    try {
      const response = await axios.get(
        "https://sistema-academia.vercel.app/api/mostrarUsuarios"
      );
      const { data } = response;
      if (response.status === 200) {
        setTodosUsuarios(data);
      } else {
        console.error("Error fetching data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  /*const handleSubmitAdd = async () => {
    const response = await axios.post(
      "http://localhost:3000/api/updateDBUser",
      { name: addNames },
      { headers: { "Content-Type": "application/json" } }
    );
    if (response.status === 200) {
      console.log(response.data);
    } else {
      console.error("Error fetching data:", response.status);
    }

    return;
  };

  const handleSubmitDelete = async () => {
    const response = await axios.post(
      "http://localhost:3000/api/deleteUser",
      { nome: deleteNames },
      { headers: { "Content-Type": "application/json" } }
    );
    if (response.status === 200) {
      console.log(response.data);
    } else {
      console.error("Error fetching data:", response.status);
    }

    return;
  };

  const handleChangeAdd = (e: any) => {
    setNamesToAdd(e.target.value);
    return addNames;
  };
  const handleChangeDelete = (e: any) => {
    setNamesToDelete(e.target.value);
    return deleteNames;
  };*/

  return (
    <section className="">
      <Head>
        <title>Sistema-Academia</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col my-5 gap-4 items-center">
        <nav className="flex gap-3">
          <a href="/paginaCPF">BuscarCPF</a>
          <br />
          <a href="/matricula">Matricula</a>
        </nav>
        <button className="border border-black p-3 rounded shadow-md active:scale-95" onClick={handleSubmit}>
          submit
        </button>
        {todosUsuarios && (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {todosUsuarios.map((usuario: Usuario) => {
              return (
                <div
                  key={usuario._id}
                  className="flex flex-col p-4 mb-5 border border-black rounded shadow-lg"
                >
                  {console.log(usuario)}
                  <p>Nome: {usuario.nome}</p>
                  <p>CPF: {usuario.cpf}</p>
                  <p>Idade: {usuario.idade}</p>
                </div>
              );
            })}
          </div>
        )}
      </main>
      <footer></footer>
    </section>
  );
}
