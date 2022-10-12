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
  gameScreenShotsUrl,
  newGamesUrl,
  popularGamesUrl,
  searchGameUrl,
  upcommingGamesUrl,
} from "../api";

type GameContextProviderProps = {
  children: ReactNode;
};

type GameContextProps = {
  getNewGames: () => Array<any>;
  getPopularGames: () => Array<any>;
  getUpcommingGames: () => Array<any>;
  isLoading: () => boolean;

  fetchGameDetail: (gameId: number) => void;
  getGameDetail: () => Array<any>;
  gameDetailLoading: () => boolean;

  getScreenShots: () => Array<any>;

  fetchSearchGames: (gameName: string) => void;
  getSearchGames: () => Array<any>;
  setSearchGamesEmpty: () => void;
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
  const [isGameDetailLoading, setGeameDetailLoading] = useState(true);
  const [screenShots, setScreenShots] = useState([]);

  const [searchGames, setSearchGames] = useState([]);

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

  const fetchGameDetail = async (gameId: number) => {
    resetGameDetail();

    const gameDetailData = await axios.get(gameDetailsUrl(gameId));
    setGameDetail(gameDetailData.data);

    const screenShootsData = await axios.get(gameScreenShotsUrl(gameId));
    setScreenShots(screenShootsData.data.results);

    setGeameDetailLoading(false);
  };

  const fetchSearchGames = async (gameName: string) => {
    const searchGameData = await axios.get(searchGameUrl(gameName));
    setSearchGames(searchGameData.data.results);
  };

  const resetGameDetail = () => {
    setGeameDetailLoading(true);
    setGameDetail([]);
    setScreenShots([]);
  };

  const getNewGames = () => newGames;
  const getPopularGames = () => popularGames;
  const getUpcommingGames = () => upcommingGames;
  const getGameDetail = () => gameDetail;

  const isLoading = () => loading;

  const gameDetailLoading = () => isGameDetailLoading;
  const getScreenShots = () => screenShots;

  const getSearchGames = () => searchGames;

  const setSearchGamesEmpty = () => {
    setSearchGames([]);
  };

  return (
    <GameContext.Provider
      value={{
        getNewGames,
        getPopularGames,
        isLoading,
        getUpcommingGames,
        fetchGameDetail,
        getGameDetail,
        gameDetailLoading,
        getScreenShots,
        fetchSearchGames,
        getSearchGames,
        setSearchGamesEmpty,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
