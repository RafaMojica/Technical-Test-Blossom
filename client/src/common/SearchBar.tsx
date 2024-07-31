import { FC } from "react";

interface SearchBarProps {
  className?: string;
}

const SearchBar: FC<SearchBarProps> = ({ className }) => {
  return (
    <div
      className={`flex justify-between items-center py-1 px-5 bg-tertiaryGrey rounded-lg ${
        className || ""
      }`}
    >
      <div className="flex justify-center items-center">
        <img src="/icons/Search-New.svg" alt="search" />
        <input
          type="text"
          placeholder="Search or filter results"
          className="mx-2 placeholder:text-sm bg-tertiaryGrey placeholder-primaryGrey outline-none"
        />
      </div>
      <button className="hover:bg-primaryHover rounded-lg p-2">
        <img src="/icons/Adjustments.svg" alt="Adjustments" />
      </button>
    </div>
  );
};

export default SearchBar;
