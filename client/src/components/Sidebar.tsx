import { useEffect, useState } from "react";
import PersonCard from "../common/PersonCard";
import SearchBar from "../common/SearchBar";
import Loading from "../common/Loading";
import { Link } from "react-router-dom";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_PERSONS } from "../services/query/get-persons";
import { Person, PersonData } from "../types/person.types";
import FilterPanel from "./FilterPanel";
import { GET_FILTER_PERSON } from "../services/query/get-filter-person";

const Sidebar = () => {
  const { data, loading } = useQuery<PersonData>(GET_PERSONS);
  const [getFilteredPerson, { data: dataFilter }] =
    useLazyQuery(GET_FILTER_PERSON);

  const [isFilterPanelVisible, setIsFilterPanelVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSortedPersons, setIsSortedPersons] = useState(true);
  const [isSortedFavorite, setIsSortedFavorite] = useState(true);
  const [allData, setAllData] = useState<Person[]>([]);
  const [favoriteData, setFavoriteData] = useState<Person[]>([]);
  const [filterCount, setFilterCount] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedSpecie, setSelectedSpecie] = useState<string | null>(null);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);

  useEffect(() => {
    const updateData = (persons: Person[]) => {
      const favorite = persons.filter((person) => person.like);
      const dislike = persons.filter((person) => !person.like);

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

      setAllData(sortedPersons);
      setFavoriteData(sortedFavorite);
    };

    if (dataFilter) {
      updateData(dataFilter.GetFilterPerson);
    } else if (data) {
      updateData(data.GetPersons);
    }
  }, [data, dataFilter, isSortedPersons, isSortedFavorite]);

  useEffect(() => {
    const countFilters = () => {
      let count = 0;
      if (selectedStatus) count++;
      if (selectedSpecie) count++;
      if (selectedGender) count++;
      return count;
    };

    setFilterCount(countFilters());
  }, [selectedStatus, selectedSpecie, selectedGender]);

  const searchFavoriteData = favoriteData.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const searchAllData = allData.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative flex flex-col h-[calc(100vh-50px)]">
      {isFilterPanelVisible && (
        <FilterPanel
          isFilterPanelVisible={isFilterPanelVisible}
          setIsFilterPanelVisible={setIsFilterPanelVisible}
          getFilteredPerson={getFilteredPerson}
          selectedStatus={selectedStatus}
          selectedSpecie={selectedSpecie}
          selectedGender={selectedGender}
          setSelectedStatus={setSelectedStatus}
          setSelectedSpecie={setSelectedSpecie}
          setSelectedGender={setSelectedGender}
        />
      )}
      <div className={`${isFilterPanelVisible && "hidden"} md:block`}>
        <h1 className="text-2xl pb-4">
          <Link to="/">Rick and Morty list</Link>
        </h1>
        <SearchBar
          onSearch={setSearchTerm}
          setIsFilterPanelVisible={setIsFilterPanelVisible}
          isFilterPanelVisible={isFilterPanelVisible}
        />
        <div className="mt-10 flex-1 flex flex-col md:max-h-[400px]">
          <div className="flex justify-between items-center p-4 text-primaryGrey font-medium">
            {dataFilter ? (
              <>
                <p className="text-primaryBlue">
                  {favoriteData.length + allData.length} Results
                </p>
                <span className="bg-primaryGreen/20 text-secondaryGreen text-xs px-3 py-0.5 rounded-full">
                  {filterCount} {filterCount === 1 ? "Filter" : "Filters"}
                </span>
              </>
            ) : (
              <>
                <h2>Starred Characters ({favoriteData.length})</h2>
                <button
                  onClick={() => setIsSortedFavorite(!isSortedFavorite)}
                  className="flex hover:text-primaryButton"
                >
                  <p>({isSortedFavorite ? "A-Z" : "Z-A"})</p>
                </button>
              </>
            )}
          </div>
          <div className="md:overflow-y-scroll">
            {loading ? (
              <Loading />
            ) : (
              searchFavoriteData.map(({ id, name, image, species, like }) => (
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
          <h2>Characters {loading ? "(0)" : `(${allData.length})`}</h2>
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
            searchAllData.map(({ id, name, image, species, like }) => (
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
    </div>
  );
};

export default Sidebar;
