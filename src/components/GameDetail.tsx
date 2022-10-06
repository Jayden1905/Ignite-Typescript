import ReactDom from "react-dom";
import { motion } from "framer-motion";
import { useGameContext } from "../context/GameContext";
// Images
import playstation from "../assets/playstation.svg";
import steam from "../assets/steam.svg";
import xbox from "../assets/xbox.svg";
import nintendo from "../assets/nintendo.svg";
import apple from "../assets/apple.svg";
import gamepad from "../assets/gamepad.svg";
// Stars
import starFull from "../assets/star-full.png";
import starEmpty from "../assets/star-empty.png";
import { SyntheticEvent } from "react";
import { DetailLoader } from "./Loading";

type GameDetailProps = {
  game: any;
  setOpen: () => void;
};

export default function ({ game, setOpen }: GameDetailProps) {
  const closeDetailHandler = (e: SyntheticEvent) => {
    const element = e.target as HTMLDivElement;

    if (element.classList.contains("shadow")) {
      setOpen();
      document.body.style.overflow = "auto";
    }
  };

  // Star rating
  const getStars = () => {
    const stars = [];
    const rating = Math.floor(game.rating);

    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <img
            className="inline mt-4 w-8 h-8"
            alt="star"
            key={i}
            src={starFull}
          />
        );
      } else {
        stars.push(
          <img
            className="inline mt-4 w-8 h-8"
            alt="star"
            key={i}
            src={starEmpty}
          />
        );
      }
    }

    return stars;
  };

  // Get platform Images
  const getPlatform = (platform: string) => {
    switch (platform) {
      case "PlayStation 4":
        return playstation;
      case "PlayStation 5":
        return playstation;
      case "PC":
        return steam;
      case "Xbox One":
        return xbox;
      case "Nintendo Switch":
        return nintendo;
      case "iOS":
        return apple;
      case "macOS":
        return apple;
      default:
        return gamepad;
    }
  };

  const { gameDetailLoading, getScreenShots } = useGameContext();
  const loading = gameDetailLoading();
  const screen = getScreenShots();

  return ReactDom.createPortal(
    <>
      {loading && <DetailLoader />}
      {!loading && (
        <motion.div
          onClick={closeDetailHandler}
          className="detail shadow fixed w-full min-h-screen flex items-center justify-center top-0 z-10 overflow-y-scroll cursor-pointer"
          exit={{ opacity: 0 }}
        >
          <motion.div
            layoutId={game.id}
            className="bg-white absolute top-0 w-[90%] rounded-2xl sm:p-20 p-10"
          >
            <motion.div className="Stats flex justify-between">
              <div className="rating">
                <motion.h3 layoutId={`title ${game.id}`} className="text-3xl">
                  {game.name}
                </motion.h3>
                <p className="opacity-60 text-xl mt-4">Rating: {game.rating}</p>
                {getStars()}
              </div>
              <div className="info flex flex-col items-center">
                <h3 className="text-3xl">Platforms</h3>
                <div className="platforms flex justify-evenly flex-wrap gap-10 mt-10">
                  {game.platforms.map((data: any) => {
                    return (
                      <img
                        className="w-12 h-12"
                        alt={data.platform.name}
                        key={data.platform.id}
                        src={getPlatform(data.platform.name)}
                      />
                    );
                  })}
                </div>
              </div>
            </motion.div>
            <motion.div className="media">
              <motion.img
                src={game.background_image}
                layoutId={`image ${game.id}`}
                alt={game.name}
                className="mt-10 w-full"
              />
            </motion.div>
            <motion.div
              className="description mt-8 text-justify"
              dangerouslySetInnerHTML={{ __html: game.description }}
            ></motion.div>
            <div className="gallery mt-8">
              {screen.map((image) => (
                <img
                  key={image.id}
                  src={image.image}
                  alt="game"
                  className="w-full"
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>,

    document.getElementById("portal") as HTMLElement
  );
}
