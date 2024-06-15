import { useEffect, useState } from "react";

const Navbar = () => {
  const [logado, setLogado] = useState(false);

  useEffect(() => {
    localStorage.getItem("token") !== null ? setLogado(true) : setLogado(false);
  }, [logado]);

  const signOut = () => {
    localStorage.removeItem("token")
    setLogado(false)
  }

  return (
    <nav className="flex gap-3 items-center my-4 flex-wrap justify-center">
      <a href="/">Home</a>
      <br />
      <a href="/matricula">Matricula</a>
      <br />
      <a href="/paginaCPF">BuscarCPF</a>
      <br />
      {logado ? (
        <>
        <a href="/criarTreinos">Criar Treinos</a>
        <button onClick={signOut} className="border border-black p-2">Sign Out</button>
        </>
      ) : (
        <>
          <a href="/signUpTreinador">Sign Up Treinador</a> <br />
          <a href="/loginTreinador">Login Treinador</a>{" "}
        </>
      )}
    </nav>
  );
};

export default Navbar;
