import { useState } from "react";
import Navbar from "./components/navbar";
import axios from "axios";
import { useRouter } from "next/navigation";

const LoginTreinador = () => {
  const [email, setEmail] = useState("");
  const [cpf, setCPF] = useState(0);
  const [erro, setErro] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://sistema-academia.vercel.app/api/loginTreinador",
        { email: email, cpf: cpf },
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": "token",
          },
        }
      );
      const { data } = response;
      if (data !== "Treinador não encontrado") {
        localStorage.setItem("token", data);
        setTimeout(() => {
          router.push("/");
        }, 1000);
        return;
      }
      setErro("Treinador não encontrado");
      return;
    } catch (err) {
      console.error(err);
    }
  };
  const handleChange = (e) => {
    switch (e.target.id) {
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
    <section className="flex flex-col items-center my-5">
      <Navbar/>
      <h1 className="text-2xl my-4">Login do treinador</h1>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
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
      {erro && <p>{erro}</p>}
    </section>
  );
};

export default LoginTreinador;
