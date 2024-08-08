import { useEffect, useState } from "react";
import PersonCard from "../common/PersonCard";
import SearchBar from "../common/SearchBar";
import Loading from "../common/Loading";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PERSONS } from "../services/query/get-persons";
import { Person, PersonData } from "../types/person.types";
import { filterData } from "../utils/filterData";
import FilterPanel from "./FilterPanel";

const Sidebar = () => {
  const { data, loading } = useQuery<PersonData>(GET_PERSONS);

  const [isFilterPanelVisible, setIsFilterPanelVisible] = useState(false);
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
    <div className="relative flex flex-col md:h-[calc(100vh-50px)]">
      <h1 className="text-2xl pb-4">
        <Link to="/">Rick and Morty list</Link>
      </h1>
      <div className="flex flex-col gap-2">
        <SearchBar
          onSearch={setSearchTerm}
          setIsFilterPanelVisible={setIsFilterPanelVisible}
          isFilterPanelVisible={isFilterPanelVisible}
        />
        {isFilterPanelVisible && <FilterPanel />}
      </div>
      <div className="mt-10 flex-1 flex flex-col md:max-h-[400px]">
        <div className="flex justify-between items-center p-4 text-primaryGrey font-medium">
          <h2>Starred Characters ({favoriteData.length})</h2>
          <button
            onClick={() => setIsSortedFavorite(!isSortedFavorite)}
            className="flex hover:text-primaryButton"
          >
            <p>({isSortedFavorite ? "A-Z" : "Z-A"})</p>
          </button>
          {/* <p className="text-primaryBlue">5 Results</p>
          <span className="bg-primaryGreen/20 text-secondaryGreen text-xs px-3 py-0.5 rounded-full">
            1 Filter
          </span> */}
        </div>
        <div className="md:overflow-y-scroll">
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
      </div>

      <div className="flex justify-between items-center p-4 text-primaryGrey font-medium">
        <h2>Characters {loading ? "(0)" : `(${sortedData.length})`}</h2>
        <button
          onClick={() => setIsSortedPersons(!isSortedPersons)}
          className="flex hover:text-primaryButton font-medium"
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
