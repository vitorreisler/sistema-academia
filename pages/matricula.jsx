import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Navbar from "./components/navbar";

const Matricula = () => {
  const [cpf, setCPF] = React.useState("");
  const [nome, setNome] = React.useState("");
  const [idade, setIdade] = React.useState("");

  const router = useRouter();

  const handleOnChangeCPF = (e) => {
    setCPF(e.target.value);
  };

  const handleOnChangeNome = (e) => {
    setNome(e.target.value);
  };

  const handleOnChangeIdade = (e) => {
    setIdade(e.target.value);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://sistema-academia.vercel.app/api/matricularAluno",
        { cpf: cpf, nome: nome, idade: idade },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const { data } = response;

      if (data === "CPF EXISTENTE") {
        return toast.error("CPF EXISTENTE");
      } else {
        toast.success("ALUNO MATRICULADO");
        setTimeout(() => {
          router.push("/");
        }, 3000);
      }
      return;
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
    
    <section className="h-dvh  flex flex-col items-center  ">
      {console.log(cpf)}
      <Navbar />
      <ToastContainer />
      <form
        onSubmit={handleSubmitForm}
        className="flex flex-col items-center my-auto"
      >
      <h1 className="text-2xl  text-center">
        Area de Matricula
      </h1>
        <label className="text-center" htmlFor="cpf">
          CPF do aluno
        </label>
        <input
          onChange={handleOnChangeCPF}
          required
          className="w-[15rem] mb-3"
          type="number"
          name=""
          id="cpf"
        />
        <label className="text-center" htmlFor="nome">
          Nome do aluno
        </label>
        <input
          onChange={handleOnChangeNome}
          required
          className="w-[15rem] mb-3"
          type="text"
          name=""
          id="nome"
        />
        <label className="text-center" htmlFor="idade">
          Idade do aluno
        </label>
        <input
          onChange={handleOnChangeIdade}
          required
          className="w-[15rem] mb-3"
          min={0}
          max={120}
          type="number"
          name=""
          id="idade"
        />
        <button
          disabled={!cpf || !nome || !idade || cpf.length !== 11 ? true : false}
          className={`border rounded p-2 border-black ${
            !cpf || !nome || !idade || cpf.length !== 11 ? "" : "hover:text-white hover:bg-gray-900"
          }`}
          type="submit"
        >
          Submit
        </button>
      </form>
    </section>
    </>
  );
};

export default Matricula;
