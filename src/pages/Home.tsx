import { useGameContext } from "../context/GameContext";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Game } from "../components/Game";
import { fade } from "../animation";
import { useState } from "react";
import GameDetail from "../components/GameDetail";

type HomeProps = {};

export const Home: React.FC<HomeProps> = () => {
  const {
    getNewGames,
    isLoading,
    getPopularGames,
    getUpcommingGames,
    fetchGameDetail,
    getGameDetail,
  } = useGameContext();

  const newGames = getNewGames();
  const popularGames = getPopularGames();
  const upcommingGames = getUpcommingGames();

  const gameDetail = getGameDetail();

  const loading = isLoading();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const changeOpenState = () => {
    setIsOpen((prev) => !prev);
  };

  const loadGameDetail = (game_id: number) => {
    fetchGameDetail(game_id);
  };

  return (
    <>
      <motion.div variants={fade} initial="hidden" animate="show">
        <LayoutGroup>
          <AnimatePresence>
            {isOpen && (
              <GameDetail game={gameDetail} setOpen={changeOpenState} />
            )}
          </AnimatePresence>
          {!loading && (
            <motion.div className="container m-auto h-screen">
              <motion.h1
                variants={fade}
                layout
                initial="hidden"
                animate="show"
                className="mt-4 p-4 text-3xl font-extrabold sm:p-0"
              >
                Upcomming Games
              </motion.h1>
              <div className="game-container mt-6 grid grid-cols-fit-300 gap-4 p-4 sm:grid-cols-fit-500 sm:p-0">
                {upcommingGames.map((game) => (
                  <Game
                    key={game.id}
                    game={game}
                    loadGameDetail={loadGameDetail}
                    setOpen={changeOpenState}
                  />
                ))}
              </div>
              <motion.h1
                variants={fade}
                initial="hidden"
                animate="show"
                className="mt-4 p-4 text-3xl font-extrabold sm:p-0"
                layout
              >
                Popular Games
              </motion.h1>
              <div className="game-container mt-6 grid grid-cols-fit-300 gap-4 p-4 sm:grid-cols-fit-500 sm:p-0">
                {popularGames.map((game) => (
                  <Game
                    key={game.id}
                    game={game}
                    loadGameDetail={loadGameDetail}
                    setOpen={changeOpenState}
                  />
                ))}
              </div>
              <motion.h1
                variants={fade}
                initial="hidden"
                animate="show"
                className="mt-4 p-4 text-3xl font-extrabold sm:p-0"
                layout
              >
                New Games
              </motion.h1>
              <div className="game-container mt-6 grid grid-cols-fit-300 gap-4 p-4 sm:grid-cols-fit-500 sm:p-0">
                {newGames.map((game) => (
                  <Game
                    key={game.id}
                    game={game}
                    loadGameDetail={loadGameDetail}
                    setOpen={changeOpenState}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </LayoutGroup>
      </motion.div>
    </>
  );
};
