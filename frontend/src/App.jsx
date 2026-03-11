import { BrowserRouter, Routes, Route } from "react-router-dom";
import PadPage from "./pages/PadPage";
import HomePage from "./pages/HomePage";
import TextEditorPage from "./pages/TextEditorPage";
import CodeEditorPage from "./pages/CodeEditorPage";
import FilePage from "./pages/FilePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pad/:code" element={<PadPage />} />
        <Route path="/pad/:code/text" element={<TextEditorPage />} />
        <Route path="/pad/:code/code" element={<CodeEditorPage />} />
        <Route path="/pad/:code/file" element={<FilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;