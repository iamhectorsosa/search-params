import { Providers } from "./providers/Providers";
import { Playground } from "./components/Playground";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route
        path="*"
        element={
          <Providers>
            <Playground />
          </Providers>
        }
      />
    </Routes>
  );
}

export default App;
