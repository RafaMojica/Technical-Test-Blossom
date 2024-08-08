import { useState } from "react";
import Button from "../common/Button";
import { FILTER } from "../constants/filter";

const FilterPanel = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(
    null
  );
  const [selectedSpecie, setSelectedSpecie] = useState<string | null>(null);

  const isFilterButtonDisabled = !selectedCharacter && !selectedSpecie;

  return (
    <div className="flex flex-col gap-6 p-6 bg-white absolute top-28 left-0 right-0 z-10 shadow-xl rounded-xl">
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
      <Button
        className={`w-full ${
          !isFilterButtonDisabled
            ? "bg-primaryButton text-white"
            : "bg-tertiaryGrey text-primaryGrey border-none"
        }`}
        disabled={isFilterButtonDisabled}
      >
        Filter
      </Button>
    </div>
  );
};

export default FilterPanel;
