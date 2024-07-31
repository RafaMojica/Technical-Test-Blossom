import ButtonLike from "../common/ButtonLike";
import PersonDescription from "../common/PersonDescription";

const CharacterDetail = () => {
  return (
    <div className="flex flex-col gap-5 flex-grow">
      <div className="relative flex flex-col gap-2">
        <img
          src="/img/1.png"
          alt="Abadango Cluster Princess"
          className="h-20 w-20"
        />
        <ButtonLike className="absolute left-14 top-12" />
        <h2 className="font-bold text-2xl">Abadango Cluster Princess</h2>
      </div>
      <div>
        <PersonDescription title="Specie" description="Alien" />
        <PersonDescription
          title="Status"
          description="Alive"
          className="border-y border-secondaryGrey"
        />
        <PersonDescription title="Occupation" description="Princess" />
      </div>
    </div>
  );
};

export default CharacterDetail;
