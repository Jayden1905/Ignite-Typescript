import { motion, LazyMotion, domAnimation, m } from "framer-motion";
import { popup } from "../animation";

type GameProps = {
  game: any;
};

export const Game: React.FC<GameProps> = ({ game }) => {
  const gameDetail = () => {
    console.log(game.id);
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        onClick={gameDetail}
        key={game.id}
        className="game flex flex-col text-center rounded-2xl cursor-pointer min-h-[30vh] overflow-hidden mb-5"
        style={{ boxShadow: "0px 5px 30px rgba(0, 0, 0, 0.2)" }}
        variants={popup}
        initial="hidden"
        animate="show"
      >
        <h3 className="text-xl pt-4">{game.name}</h3>
        <p className="opacity-50 text-lg">{game.released}</p>
        <img
          src={game.background_image}
          alt={game.name}
          className="w-full object-cover aspect-auto h-[40vh]"
        />
      </m.div>
    </LazyMotion>
  );
};
