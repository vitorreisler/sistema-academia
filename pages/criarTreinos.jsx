import { useState } from "react";
import Navbar from "./components/navbar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CriarTreinos = () => {
  const [nivel, setNivel] = useState("iniciante");
  const [exercicios, setExercicios] = useState([
    { id: 1, nome: "", series: "", repeticoes: "", descanso: "" },
  ]);

  const handleOnChange = (e, id) => {
    const { name, value } = e.target;
    setExercicios((prevExercicios) =>
      prevExercicios.map((ex) => (ex.id === id ? { ...ex, [name]: value } : ex))
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const treinoData = {
      nivel: nivel,
      exercicios: exercicios,
    };
    try {
      const response = await axios.post(
        "https://sistema-academia.vercel.app/api/criarTreino",
        treinoData,
        { headers: { "Content-Type": "application/json" } }
      );
      toast.success("Treino criado");
      if (response.status !== 200) {
        return toast.error("Algo errado aconteceu...");
      }
    } catch (error) {
      console.error("Error creating treino:", error);
    }
  };

  const verTreino = async () => {
    try {
      const response1 = await axios.get(
        "https://sistema-academia.vercel.app/api/verTreino"
      );
      console.log(response1.data);
    } catch (error) {
      console.error("Error creating treino:", error);
    }
  };

  const handleClickPlus = () => {
    setExercicios([
      ...exercicios,
      {
        id: exercicios.length + 1,
        nome: "",
        series: "",
        repeticoes: "",
        descanso: "",
      },
    ]);
  };

  return (
    <section className="flex flex-col items-center justify-center p-2">
      <Navbar />
      <ToastContainer />
      <form onSubmit={handleSubmit} method="">
        <div>
          <label htmlFor="nivel">Treino Nivel: </label>
          <select
            onChange={(e) => setNivel(e.target.value)}
            name="nivel"
            id="nivel"
          >
            <option value="iniciante">Iniciante</option>
            <option value="moderado">Moderado</option>
            <option value="avancado">Avançado</option>
          </select>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-3">
          {exercicios.map((ex) => (
            <div className="border border-black rounded-md p-3" key={ex.id}>
              <h3>ex{ex.id}:</h3>
              <div className="flex flex-col">
                <label htmlFor={`nomeEx${ex.id}`}>Nome:</label>
                <input
                  required
                  onChange={(e) => handleOnChange(e, ex.id)}
                  type="text"
                  name="nome"
                  value={ex.nome}
                  id={`nomeEx${ex.id}`}
                />
                <br />
                <label htmlFor={`seriesEx${ex.id}`}>Series:</label>
                <input
                  required
                  onChange={(e) => handleOnChange(e, ex.id)}
                  type="number"
                  name="series"
                  value={ex.series}
                  id={`seriesEx${ex.id}`}
                />
                <br />
                <label htmlFor={`repeticoesEx${ex.id}`}>Repetições:</label>
                <input
                  required
                  onChange={(e) => handleOnChange(e, ex.id)}
                  type="number"
                  name="repeticoes"
                  value={ex.repeticoes}
                  id={`repeticoesEx${ex.id}`}
                />
                <br />
                <label htmlFor={`descansoEx${ex.id}`}>Descanso:</label>
                <input
                  required
                  onChange={(e) => handleOnChange(e, ex.id)}
                  type="text"
                  name="descanso"
                  value={ex.descanso}
                  id={`descansoEx${ex.id}`}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          <button type="submit" className="border border-black p-4">
            submit
          </button>
          <button
            type="button"
            onClick={handleClickPlus}
            className="border border-black p-4"
          >
            +
          </button>
          <button
            type="button"
            onClick={verTreino}
            className="border border-black p-4"
          >
            ver treino
          </button>
        </div>
      </form>
    </section>
  );
};

export default CriarTreinos;
