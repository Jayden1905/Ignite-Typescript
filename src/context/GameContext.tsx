import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  gameDetailsUrl,
  newGamesUrl,
  popularGamesUrl,
  upcommingGamesUrl,
} from "../api";

type GameContextProviderProps = {
  children: ReactNode;
};

type GameContextProps = {
  getNewGames: () => Array<any>;
  getPopularGames: () => Array<any>;
  getUpcommingGames: () => Array<any>;
  fetchGameDetail: (gameId: number) => void;
  getGameDetail: () => Array<any>;
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
  const [popularGames, setPopularGames] = useState([]);
  const [upcommingGames, setUpcommingGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gameDetail, setGameDetail] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const newGamesData = await axios.get(newGamesUrl());
      setNewGames(newGamesData.data.results);

      const popularGamesData = await axios.get(popularGamesUrl());
      setPopularGames(popularGamesData.data.results);

      const upcommingGamesData = await axios.get(upcommingGamesUrl());
      setUpcommingGames(upcommingGamesData.data.results);

      setLoading(false);
    };

    loadData();
  }, []);

  async function fetchGameDetail(gameId: number) {
    const gameDetailData = await axios.get(gameDetailsUrl(gameId));
    setGameDetail(gameDetailData.data);
  }

  const getNewGames = () => newGames;
  const getPopularGames = () => popularGames;
  const getUpcommingGames = () => upcommingGames;
  const getGameDetail = () => gameDetail;

  const isLoading = () => loading;

  return (
    <GameContext.Provider
      value={{
        getNewGames,
        getPopularGames,
        isLoading,
        getUpcommingGames,
        fetchGameDetail,
        getGameDetail,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
