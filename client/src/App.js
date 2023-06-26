import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactForm from "./pages/ReactForm";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<ReactForm/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
