import { FC } from "react";
import Button from "../common/Button";

interface CharacterFilterProps {
  title: string;
  selected: string | null;
  setSelected: (character: string | null) => void;
  options: string[];
}

const CharacterFilter: FC<CharacterFilterProps> = ({
  title,
  selected,
  setSelected,
  options,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-primaryGrey font-medium">{title}</h3>
      <div className="flex items-center justify-between gap-2">
        {options.map((option) => (
          <Button
            key={option}
            isSelected={
              selected === option || (selected === null && option === "All")
            }
            onClick={() => setSelected(option === "All" ? null : option)}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CharacterFilter;
