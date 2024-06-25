import { Routes,Route } from "react-router-dom";
import "./App.css";
import { Comments } from "./Components";
import "./index.css";

function App() {
  return (
    <Routes>
      <Route path={"/"} element={<Comments currentUserId="1" />}/>
    </Routes>
  );
}

export default App;
