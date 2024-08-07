import Button from "../common/Button";

const FilterPanel = () => {
  return (
    <div className="flex flex-col gap-6 p-6 bg-white absolute top-28 left-0 right-0 z-10 shadow-xl rounded-xl">
      <div className="flex flex-col gap-2">
        <h3 className="text-primaryGrey font-medium">Character</h3>
        <div className="flex items-center justify-between gap-2">
          <Button>All</Button>
          <Button>Starred</Button>
          <Button>Others</Button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-primaryGrey font-medium">Specie</h3>
        <div className="flex items-center justify-between gap-2">
          <Button>All</Button>
          <Button>Human</Button>
          <Button>Alien</Button>
        </div>
      </div>
      <Button className="w-full">filter</Button>
    </div>
  );
};

export default FilterPanel;
