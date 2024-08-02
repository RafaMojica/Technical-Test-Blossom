import { Route, Routes } from "react-router-dom";
import Layout from "./common/Layout";
import CharacterDetail from "./components/CharacterDetail";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <Layout className="gap-24">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="block md:hidden flex-grow">
        <Routes>
          <Route path="/" element={<Sidebar />} />
          <Route path="/person/:id" element={<CharacterDetail />} />
        </Routes>
      </div>
      <div className="hidden md:block md:flex-grow">
        <Routes>
          <Route path="/person/:id" element={<CharacterDetail />} />
        </Routes>
      </div>
    </Layout>
  );
}

export default App;
