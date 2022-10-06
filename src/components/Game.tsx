import { motion } from "framer-motion";
import { popup } from "../animation";

type GameProps = {
  game: any;
  setOpen: () => void;
  loadGameDetail: (game_id: number) => void;
};

export const Game: React.FC<GameProps> = ({
  game,
  setOpen,
  loadGameDetail,
}) => {
  const gameDetailHandler = () => {
    setOpen();
    loadGameDetail(game.id);
    document.body.style.overflow = "hidden";
  };

  return (
    <>
      <motion.div
        onClick={gameDetailHandler}
        key={game.id}
        layout
        className="game mb-5 flex min-h-[30vh] cursor-pointer flex-col overflow-hidden rounded-2xl text-center"
        style={{ boxShadow: "0px 5px 30px rgba(0, 0, 0, 0.2)" }}
        variants={popup}
        initial="hidden"
        animate="show"
      >
        <motion.h3 className="pt-4 text-xl">{game.name}</motion.h3>
        <motion.p className="text-lg opacity-50">{game.released}</motion.p>
        <motion.img
          src={game.background_image}
          alt={game.name}
          className="aspect-auto h-[40vh] w-full object-cover"
        />
      </motion.div>
    </>
  );
};
