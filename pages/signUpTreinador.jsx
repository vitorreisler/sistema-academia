import { useState } from "react";
import Navbar from "./components/navbar";
import axios from "axios";
import { useRouter } from "next/navigation";

const SignUpTreinador = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCPF] = useState(0);
  const [cadastrado, setCadastrado] = useState("")
  const router = useRouter()
  

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axios.post(
        "https://sistema-academia.vercel.app/api/signUpTreinador",
        { nome: nome, email: email, cpf: cpf },
        { headers: { "Content-Type": "application/json" } }
      );
      const { data } = response;
     if(data === "Este treinador ja existe"){
      setCadastrado(data)
      return 
     }
     setCadastrado("O Treiandor foi cadastrado");
     setTimeout(() => {
      router.push("/loginTreinador")
     }, 3000);

      
      return;
    } catch (err) {
      console.error(err);
    }
  };
  const handleChange = (e) => {
    switch (e.target.id) {
      case "nome":
        setNome(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "cpf":
        setCPF(e.target.value);
        break;

      default:
        break;
    }
  };

  return (
    <section className="flex flex-col items-center">
      <Navbar/>
      <h1 className="text-2xl my-4">Sign Up do treinador</h1>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="nome">Nome</label>
          <input onChange={handleChange} type="text" name="" id="nome" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input onChange={handleChange} type="email" name="" id="email" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="cpf">CPF</label>
          <input onChange={handleChange} type="number" name="" id="cpf" />
        </div>
        <button className="border border-black" type="submit">
          submit
        </button>
      </form>
      {cadastrado && <p className="my-3">{cadastrado}</p> }
    </section>
  );
};

export default SignUpTreinador;
