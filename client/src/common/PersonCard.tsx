import { FC } from "react";
import ButtonLike from "./ButtonLike";

interface PersonCardProps {
  name: string;
  image: string;
  specie: string;
  className?: string;
}

const PersonCard: FC<PersonCardProps> = ({
  name,
  image,
  specie,
  className,
}) => {
  return (
    <div
      className={`flex py-4 px-5 items-center justify-between border-t rounded-lg cursor-pointer border-secondaryGrey focus:bg-primaryHover ${
        className || ""
      }`}
    >
      <div className="flex justify-center items-center gap-4">
        <img src={image} alt={name} />
        <div>
          <h3 className="font-bold">{name}</h3>
          <h3 className="text-primaryGrey">{specie}</h3>
        </div>
      </div>
      <ButtonLike />
    </div>
  );
};

export default PersonCard;
