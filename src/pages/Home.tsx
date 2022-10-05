import { useGameContext } from "../context/GameContext";
import { motion } from "framer-motion";
import { Game } from "../components/Game";
import { fade } from "../animation";

type HomeProps = {};

export const Home: React.FC<HomeProps> = () => {
  const { getNewGames, isLoading, getPopularGames, getUpcommingGames } =
    useGameContext();
  const newGames = getNewGames();
  const popularGames = getPopularGames();
  const upcommingGames = getUpcommingGames();
  const loading = isLoading();

  return (
    <>
      {!loading && (
        <motion.div
          variants={fade}
          initial="hidden"
          animate="show"
          className="container h-screen m-auto"
        >
          <h1 className="text-3xl font-extrabold sm:p-0 p-4 mt-4">
            Upcomming Games
          </h1>
          <div className="game-container grid sm:grid-cols-fit-500 grid-cols-fit-300 gap-4 mt-6 sm:p-0 p-4">
            {upcommingGames.map((game) => (
              <Game game={game} />
            ))}
          </div>

          <h1 className="text-3xl font-extrabold sm:p-0 p-4 mt-4">
            Popular Games
          </h1>
          <div className="game-container grid sm:grid-cols-fit-500 grid-cols-fit-300 gap-4 mt-6 sm:p-0 p-4">
            {popularGames.map((game) => (
              <Game game={game} />
            ))}
          </div>

          <h1 className="text-3xl font-extrabold sm:p-0 p-4 mt-4">New Games</h1>
          <div className="game-container grid sm:grid-cols-fit-500 grid-cols-fit-300 gap-4 mt-6 sm:p-0 p-4">
            {newGames.map((game) => (
              <Game game={game} />
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
};
