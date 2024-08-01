import { useEffect, useState } from "react";
import PersonCard from "../common/PersonCard";
import SearchBar from "../common/SearchBar";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PERSONS } from "../services/query/get-persons";
import { PersonData } from "../types/person.types";
import Loading from "../common/Loading";

const Sidebar = () => {
  const { data, loading } = useQuery<PersonData>(GET_PERSONS);

  const [isSorted, setIsSorted] = useState(true);
  const [sortedData, setSortedData] = useState<
    PersonData["characters"]["results"]
  >([]);

  useEffect(() => {
    if (data) {
      const sorted = [...data.characters.results].sort((a, b) =>
        isSorted ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      );
      setSortedData(sorted);
    }
  }, [data, isSorted]);

  return (
    <div>
      <h1 className="text-2xl pb-4">
        <Link to="/">Rick and Morty list</Link>
      </h1>
      <SearchBar />

      <div className="mt-10 flex justify-between items-center text-primaryGrey">
        <h2 className="py-4 pl-4 font-medium">Starred Characters (0)</h2>
      </div>

      <div className="flex justify-between items-center text-primaryGrey">
        <h2 className="py-4 pl-4 font-medium">
          Characters {loading ? "(0)" : `(${sortedData.length})`}
        </h2>
        <button
          onClick={() => setIsSorted(!isSorted)}
          className="flex gap-1 hover:text-primaryButton font-medium"
        >
          <p>({isSorted ? "A-Z" : "Z-A"})</p>
        </button>
      </div>
      {loading ? (
        <Loading />
      ) : (
        sortedData.map(({ id, name, image, species }) => (
          <PersonCard key={id} name={name} image={image} specie={species} />
        ))
      )}
    </div>
  );
};

export default Sidebar;
