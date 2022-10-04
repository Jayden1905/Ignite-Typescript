import axios from "axios";
import { createContext, ReactNode, useContext, useState } from "react";
import { newGamesUrl } from "../api";

type GameContextProviderProps = {
  children: ReactNode;
};

type GameContextProps = {
  fetchNewGames: () => void;
  getNewGames: () => object;
  fetchPopularGames: () => void;
  fetchUpcommingGames: () => void;
};

const GameContext = createContext({} as GameContextProps);

export function useGameContext() {
  return useContext(GameContext);
}

export default function GameContextProvider({
  children,
}: GameContextProviderProps) {
  const [newGames, setNewGames] = useState({});

  const fetchNewGames = async () => {
    const newGamesData = await axios.get(newGamesUrl());
    setNewGames(newGamesData.data.results);
  };

  const getNewGames = () => newGames;

  function fetchPopularGames() {}

  function fetchUpcommingGames() {}

  return (
    <GameContext.Provider
      value={{
        fetchNewGames,
        fetchPopularGames,
        fetchUpcommingGames,
        getNewGames,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
