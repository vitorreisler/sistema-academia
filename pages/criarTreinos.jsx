import { useState } from "react";
import Navbar from "./components/navbar";

const CriarTreinos = () => {
  const [nivel, setNivel] = useState();

  const handleOnChange = (e) => {
    switch (e.target.id) {
        case "nivel":
                setNivel(e.target.value)
            break;
    
        default:
            break;
    }
    return
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    return;
  };
  return (
    <section className="flex flex-col items-center justify-center">
      <Navbar />
      <form onSubmit={handleSubmit} action="">
        <div>
          <label htmlFor="nivel">Treino Nivel: </label>
          <select onChange={handleOnChange} name="" id="nivel">
            <option value="iniciante">Iniciante</option>
            <option value="moderado">Moderado</option>
            <option value="avancado">Avancado</option>
          </select>
        </div>
        <h3>ex1:</h3>
        <div className="flex flex-col">
            <label  htmlFor="nomeEx1">Nome:</label>
            <input type="text" name="" id="nomeEx1" />
            <br />
            <label htmlFor="seriesEx1">Series:</label>
            <input type="number" name="" id="seriesEx1" />
            <br />
            <label htmlFor="repeticoesEx1">Repetições:</label>
            <input type="number" name="" id="repeticoesEx1" />
            <br />
            <label htmlFor="descansoEx1">Descanso:</label>
            <input type="text" name="" id="descansoEx1" />
        </div>
        <button className="border border-black p-4"> submit</button>
      </form>
    </section>
  );
};

export default CriarTreinos;
