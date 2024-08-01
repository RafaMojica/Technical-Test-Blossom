import { Route, Routes } from "react-router-dom";
import Layout from "./common/Layout";
import CharacterDetail from "./components/CharacterDetail";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <Layout className="gap-24">
      <Sidebar />
      <Routes>
        <Route path="/person/:id" element={<CharacterDetail />} />
      </Routes>
    </Layout>
  );
}

export default App;
