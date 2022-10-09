import { motion } from "framer-motion";
import { SyntheticEvent, useRef } from "react";
import logo from "../assets/logo.svg";

export default function Nav() {
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmitHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(inputRef.current?.value);

    if (inputRef.current !== null) inputRef.current.value = "";
  };

  return (
    <motion.nav className="grid text-center place-items-center px-20 py-10">
      <div className="logo flex justify-center p-4 cursor-pointer gap-2">
        <img src={logo} alt="logo" className="w-8 h-8" />
        <h1 className="text-3xl">Ignite</h1>
      </div>
      <form
        className="search w-full h-full flex justify-center"
        onSubmit={onSubmitHandler}
      >
        <input
          ref={inputRef}
          type="text"
          className="w-[30%] h-fll p-1 border-none text-2xl outline-none shadow-lg"
        />
        <button
          type="submit"
          className="text-2xl border-none p-1 cursor-pointer bg-red-400 text-white"
        >
          Search
        </button>
      </form>
    </motion.nav>
  );
}
