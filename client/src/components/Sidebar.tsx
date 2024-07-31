import { useEffect, useState } from "react";
import PersonCard from "../common/PersonCard";
import SearchBar from "../common/SearchBar";
import { personsFakeData } from "../utils/personsFakeData";
import { Person } from "../types/person.types";

const Sidebar = () => {
  const [isSorted, setIsSorted] = useState(true);
  const [isSortedFavorite, setIsSortedFavorite] = useState(true);
  const [sortedData, setSortedData] = useState<Person[]>([]);
  const [sortedFavorite, setSortedFavorite] = useState<Person[]>([]);

  useEffect(() => {
    const favoriteData = personsFakeData.filter((person) => person.like);
    const data = personsFakeData.filter((person) => !person.like);

    const sortedData = [...data].sort((a, b) =>
      isSorted ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );

    const sortedFavorite = [...favoriteData].sort((a, b) =>
      isSortedFavorite
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

    setSortedFavorite(sortedFavorite);
    setSortedData(sortedData);
  }, [isSorted, isSortedFavorite]);

  return (
    <div>
      <h1 className="text-2xl pb-4">Rick and Morty list</h1>
      <SearchBar />

      <div className="mt-10 flex justify-between items-center text-primaryGrey">
        <h2 className="py-4 pl-4 font-medium">Starred Characters (0)</h2>
        <button
          onClick={() => setIsSortedFavorite(!isSortedFavorite)}
          className="flex gap-1 hover:text-primaryButton font-medium"
        >
          <p>({isSortedFavorite ? "A-Z" : "Z-A"})</p>
        </button>
      </div>
      {sortedFavorite.map(({ id, name, image, specie }) => (
        <PersonCard key={id} name={name} image={image} specie={specie} />
      ))}

      <div className="flex justify-between items-center text-primaryGrey">
        <h2 className="py-4 pl-4 font-medium">Characters (0)</h2>
        <button
          onClick={() => setIsSorted(!isSorted)}
          className="flex gap-1 hover:text-primaryButton font-medium"
        >
          <p>({isSorted ? "A-Z" : "Z-A"})</p>
        </button>
      </div>
      {sortedData.map(({ id, name, image, specie }) => (
        <PersonCard key={id} name={name} image={image} specie={specie} />
      ))}
    </div>
  );
};

export default Sidebar;
