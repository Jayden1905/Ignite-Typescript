import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { newGamesUrl } from "../api";

type GameContextProviderProps = {
  children: ReactNode;
};

type GameContextProps = {
  getNewGames: () => Array<any>;
  isLoading: () => boolean;
};

const GameContext = createContext({} as GameContextProps);

export function useGameContext() {
  return useContext(GameContext);
}

export default function GameContextProvider({
  children,
}: GameContextProviderProps) {
  const [newGames, setNewGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const newGamesData = await axios.get(newGamesUrl());
      setNewGames(newGamesData.data.results);
      setLoading(false);
    };

    loadData();
  }, []);

  const getNewGames = () => newGames;

  const isLoading = () => loading;

  return (
    <GameContext.Provider
      value={{
        getNewGames,
        isLoading,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
