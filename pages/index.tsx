import Head from "next/head";
import clientPromise from "../lib/mongodb";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import axios from "axios";
import React, { useEffect } from "react";
import Loading from "./components/loading";
import Navbar from "./components/navbar";
import { useRouter } from "next/navigation";

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
  const [loading, setLoading] = React.useState(false);
  const [logado, setLogado] = React.useState(false);

  const router = useRouter();

  useEffect(() => {
    localStorage.getItem("token") !== null ? setLogado(true) : setLogado(false);
  }, [logado]);

 

  const handleSubmit = async () => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="">
      <Head>
        <title>Sistema-Academia</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col my-5 gap-4 items-center ">
        <Navbar />
        {logado && <button
          className="border border-black p-3 rounded shadow-md active:scale-95 hover:bg-black hover:text-white"
          onClick={handleSubmit}
        >
          submit
        </button>}
        {loading && <Loading />}
       { logado && !loading && todosUsuarios && (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 p-2">
            {todosUsuarios.map((usuario: Usuario) => {
              return (
                <div
                  key={usuario._id}
                  className="flex flex-col p-4 mb-5 border border-black rounded shadow-lg bg-white"
                >
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
