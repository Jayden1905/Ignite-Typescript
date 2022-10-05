import ReactDom from "react-dom";

type GameDetailProps = {
  game: any;
  changeOpenState: () => void;
};

export default function ({ game, changeOpenState }: GameDetailProps) {
  console.log(game);
  return ReactDom.createPortal(
    <div>
      <h1>{game.name}</h1>
    </div>,
    document.getElementById("portal") as HTMLElement
  );
}
