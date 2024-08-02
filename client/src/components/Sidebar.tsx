import { useEffect, useState } from "react";
import PersonCard from "../common/PersonCard";
import SearchBar from "../common/SearchBar";
import Loading from "../common/Loading";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PERSONS } from "../services/query/get-persons";
import { Person, PersonData } from "../types/person.types";
import { filterData } from "../utils/filterData";

const Sidebar = () => {
  const { data, loading } = useQuery<PersonData>(GET_PERSONS);

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSortedPersons, setIsSortedPersons] = useState(true);
  const [isSortedFavorite, setIsSortedFavorite] = useState(true);
  const [sortedData, setSortedData] = useState<Person[]>([]);
  const [favoriteData, setFavoriteData] = useState<Person[]>([]);

  useEffect(() => {
    if (data) {
      const favorite = data.GetPersons.filter((person) => person.like);
      const dislike = data.GetPersons.filter((person) => !person.like);

      const sortedPersons = [...dislike].sort((a, b) =>
        isSortedPersons
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );

      const sortedFavorite = [...favorite].sort((a, b) =>
        isSortedFavorite
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );

      setSortedData(sortedPersons);
      setFavoriteData(sortedFavorite);
    }
  }, [data, isSortedPersons, isSortedFavorite]);

  const filteredData = filterData(sortedData, searchTerm);
  const filteredDataFavorite = filterData(favoriteData, searchTerm);

  return (
    <div className="flex flex-col flex-grow md:flex-grow-0">
      <h1 className="text-2xl pb-4">
        <Link to="/">Rick and Morty list</Link>
      </h1>
      <SearchBar onSearch={setSearchTerm} />

      <div className="mt-10 flex justify-between items-center text-primaryGrey">
        <h2 className="py-4 pl-4 font-medium">
          Starred Characters ({favoriteData.length})
        </h2>
        <button
          onClick={() => setIsSortedFavorite(!isSortedFavorite)}
          className="flex gap-1 hover:text-primaryButton font-medium"
        >
          <p>({isSortedFavorite ? "A-Z" : "Z-A"})</p>
        </button>
      </div>
      <div className="md:overflow-y-scroll h-max-[60px]">
        {loading ? (
          <Loading />
        ) : (
          filteredDataFavorite.map(({ id, name, image, species, like }) => (
            <Link
              to={`/person/${id}`}
              key={id}
              onClick={() => setSelectedId(id)}
            >
              <PersonCard
                key={id}
                id={id}
                name={name}
                image={image}
                specie={species}
                like={like}
                isSelected={selectedId === id}
              />
            </Link>
          ))
        )}
      </div>

      <div className="flex justify-between items-center text-primaryGrey">
        <h2 className="py-4 pl-4 font-medium">
          Characters {loading ? "(0)" : `(${sortedData.length})`}
        </h2>
        <button
          onClick={() => setIsSortedPersons(!isSortedPersons)}
          className="flex gap-1 hover:text-primaryButton font-medium"
        >
          <p>({isSortedPersons ? "A-Z" : "Z-A"})</p>
        </button>
      </div>
      <div className="md:overflow-y-scroll">
        {loading ? (
          <Loading />
        ) : (
          filteredData.map(({ id, name, image, species, like }) => (
            <Link
              to={`/person/${id}`}
              key={id}
              onClick={() => setSelectedId(id)}
            >
              <PersonCard
                key={id}
                id={id}
                name={name}
                image={image}
                specie={species}
                like={like}
                isSelected={selectedId === id}
              />
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Sidebar;
