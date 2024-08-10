import { Dispatch, FC, SetStateAction } from "react";
import Button from "../common/Button";
import { FILTER } from "../constants/filter";
import { FilterParams } from "../types/filter.type";
import CharacterFilter from "../common/CharacterFilter";

interface FilterPanelProps {
  isFilterPanelVisible: boolean;
  setIsFilterPanelVisible: (isVisible: boolean) => void;
  getFilteredPerson: (params: FilterParams) => void;
  selectedStatus: string | null;
  selectedSpecie: string | null;
  selectedGender: string | null;
  setSelectedStatus: Dispatch<SetStateAction<string | null>>;
  setSelectedSpecie: Dispatch<SetStateAction<string | null>>;
  setSelectedGender: Dispatch<SetStateAction<string | null>>;
}

const FilterPanel: FC<FilterPanelProps> = ({
  isFilterPanelVisible,
  setIsFilterPanelVisible,
  getFilteredPerson,
  selectedStatus,
  selectedSpecie,
  selectedGender,
  setSelectedStatus,
  setSelectedSpecie,
  setSelectedGender,
}) => {
  const handleFilterClick = () => {
    getFilteredPerson({
      variables: {
        species: selectedSpecie,
        gender: selectedGender,
        status: selectedStatus,
      },
    });
    setIsFilterPanelVisible(false);
  };

  return (
    <div
      className="flex flex-col gap-6 bg-white h-full md:h-min
    md:absolute md:p-6 md:top-28 md:left-0 md:right-0 md:z-10 md:shadow-xl md:rounded-xl
    "
    >
      <div className="relative flex justify-center items-center md:hidden">
        <button
          onClick={() => setIsFilterPanelVisible(!isFilterPanelVisible)}
          className="absolute left-0"
        >
          <img src="/icons/Arrow-Left.svg" alt="Arrow left" />
        </button>
        <h3 className="m-auto font-medium">Filter</h3>
      </div>
      <CharacterFilter
        title="Specie"
        options={FILTER.SPECIE_OPTIONS}
        selected={selectedSpecie}
        setSelected={setSelectedSpecie}
      />
      <CharacterFilter
        title="Gender"
        options={FILTER.GENDER_OPTIONS}
        selected={selectedGender}
        setSelected={setSelectedGender}
      />
      <CharacterFilter
        title="Status"
        options={FILTER.STATUS_OPTIONS}
        selected={selectedStatus}
        setSelected={setSelectedStatus}
      />
      <div className="mt-auto">
        <Button
          onClick={handleFilterClick}
          className={`w-full  bg-primaryButton text-white }`}
        >
          Filter
        </Button>
      </div>
    </div>
  );
};

export default FilterPanel;
