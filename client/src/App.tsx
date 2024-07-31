import Layout from "./common/Layout";
import CharacterDetail from "./components/CharacterDetail";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <Layout className="gap-24">
      <Sidebar />
      <CharacterDetail />
    </Layout>
  );
}

export default App;
