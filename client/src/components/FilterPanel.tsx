import { FC, useState } from "react";
import Button from "../common/Button";
import { FILTER } from "../constants/filter";

interface FilterPanelProps {
  isFilterPanelVisible: boolean;
  setIsFilterPanelVisible: (isVisible: boolean) => void;
}

const FilterPanel: FC<FilterPanelProps> = ({
  isFilterPanelVisible,
  setIsFilterPanelVisible,
}) => {
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(
    null
  );
  const [selectedSpecie, setSelectedSpecie] = useState<string | null>(null);

  const isFilterButtonDisabled = !selectedCharacter && !selectedSpecie;

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

      <div className="flex flex-col gap-2">
        <h3 className="text-primaryGrey font-medium">Character</h3>
        <div className="flex items-center justify-between gap-2">
          {FILTER.CHARACTER_OPTIONS.map((option) => (
            <Button
              key={option}
              isSelected={selectedCharacter === option}
              onClick={() => setSelectedCharacter(option)}
            >
              {option}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-primaryGrey font-medium">Specie</h3>
        <div className="flex items-center justify-between gap-2">
          {FILTER.SPECIE_OPTIONS.map((option) => (
            <Button
              key={option}
              isSelected={selectedSpecie === option}
              onClick={() => setSelectedSpecie(option)}
            >
              {option}
            </Button>
          ))}
        </div>
      </div>
      <div className="mt-auto">
        <Button
          className={`w-full ${
            !isFilterButtonDisabled
              ? "bg-primaryButton text-white"
              : "bg-tertiaryGrey text-primaryGrey border-tertiaryGrey"
          }`}
          disabled={isFilterButtonDisabled}
        >
          Filter
        </Button>
      </div>
    </div>
  );
};

export default FilterPanel;
