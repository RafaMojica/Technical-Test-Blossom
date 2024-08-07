import { FC } from "react";

interface SearchBarProps {
  className?: string;
  onSearch: (term: string) => void;
  setIsFilterPanelVisible: (isVisible: boolean) => void;
  isFilterPanelVisible: boolean;
}

const SearchBar: FC<SearchBarProps> = ({
  className,
  onSearch,
  setIsFilterPanelVisible,
  isFilterPanelVisible,
}) => {
  return (
    <div className="relative">
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
            onChange={(event) => onSearch(event.target.value)}
          />
        </div>
        <button
          onClick={() => setIsFilterPanelVisible(!isFilterPanelVisible)}
          className={`hover:bg-primaryHover rounded-lg p-2 ${
            isFilterPanelVisible && "bg-primaryHover"
          }`}
        >
          <img src="/icons/Adjustments.svg" alt="Adjustments" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
