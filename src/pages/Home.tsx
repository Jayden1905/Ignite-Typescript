import { useGameContext } from "../context/GameContext";
import { motion } from "framer-motion";

type HomeProps = {};

export const Home: React.FC<HomeProps> = () => {
  const { getNewGames, isLoading } = useGameContext();
  const newGames = getNewGames();
  const loading = isLoading();
  console.log(newGames);

  return (
    <>
      {!loading && (
        <motion.div className="container h-screen m-auto">
          <h1 className="text-3xl font-extrabold">New Games</h1>
          <div className="game-container grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 mt-6">
            {newGames.map((game) => (
              <div
                key={game.id}
                className="game flex flex-col text-center rounded-2xl shadow-2xl  h-[30vh]"
              >
                <h3>{game.name}</h3>
                <p>{game.released}</p>
                <img src={game.background_image} alt={game.name} />
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
};
