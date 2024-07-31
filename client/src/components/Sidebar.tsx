import PersonCard from "../common/PersonCard";
import SearchBar from "../common/SearchBar";
import { personsFakeData } from "../utils/personsFakeData";

const Sidebar = () => {
  return (
    <div>
      <h1 className="text-2xl pb-4">Rick and Morty list</h1>
      <SearchBar />
      <h2 className="mt-10 py-5 pl-4  text-primaryGrey font-medium">
        Starred Characters (0)
      </h2>
      <h2 className="py-4 pl-4 text-primaryGrey font-medium">Characters (0)</h2>
      {personsFakeData.map(({ id, name, image, specie }) => (
        <PersonCard key={id} name={name} image={image} specie={specie} />
      ))}
    </div>
  );
};

export default Sidebar;
