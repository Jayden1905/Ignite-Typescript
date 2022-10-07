import Nav from "./components/Nav";
import { useGameContext } from "./context/GameContext";
import { Home } from "./pages/Home";

function App() {
  const { isLoading } = useGameContext();
  const loading = isLoading();
  return (
    <>
      {!loading && <Nav />}
      <Home />
    </>
  );
}

export default App;
