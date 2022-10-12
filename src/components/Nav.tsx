import { motion } from "framer-motion";
import { SyntheticEvent, useRef } from "react";
import logo from "../assets/logo.svg";
import { useGameContext } from "../context/GameContext";

export default function Nav() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fetchSearchGames, setSearchGamesEmpty } = useGameContext();

  const onSubmitHandler = (e: SyntheticEvent) => {
    e.preventDefault();

    if (inputRef.current?.value !== undefined) {
      fetchSearchGames(inputRef.current?.value);
    }

    if (inputRef.current !== null) inputRef.current.value = "";
  };

  return (
    <motion.nav className="grid place-items-center px-20 py-10 text-center">
      <div className="logo flex cursor-pointer justify-center gap-2 p-4">
        <img
          src={logo}
          alt="logo"
          className="h-8 w-8 cursor-pointer"
          onClick={setSearchGamesEmpty}
        />
        <h1 className="text-3xl">Ignite</h1>
      </div>
      <form
        className="search flex h-full w-full justify-center"
        onSubmit={onSubmitHandler}
      >
        <input
          ref={inputRef}
          type="text"
          className="h-fll w-[30%] border-none p-1 text-2xl shadow-lg outline-none"
        />
        <button
          type="submit"
          className="cursor-pointer border-none bg-red-400 p-1 text-2xl text-white"
        >
          Search
        </button>
      </form>
    </motion.nav>
  );
}
