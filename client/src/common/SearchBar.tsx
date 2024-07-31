const SearchBar = () => {
  return (
    <div className="flex justify-center items-center py-2 px-5 bg-tertiaryGrey rounded-lg">
      <img src="/icons/Search-New.svg" alt="search" />
      <input
        type="text"
        placeholder="Search or filter results"
        className="mx-2 placeholder:text-sm bg-tertiaryGrey placeholder-primaryGrey outline-none"
      />
      <button className="hover:bg-primaryHover rounded-lg p-2">
        <img src="/icons/Adjustments.svg" alt="Adjustments" />
      </button>
    </div>
  );
};

export default SearchBar;
