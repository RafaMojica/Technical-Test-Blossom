import { FC, useState } from "react";
import ButtonLike from "./ButtonLike";
import { TOGGLE_LIKE } from "../services/mutations/toggle-like";
import { useMutation } from "@apollo/client";

interface PersonCardProps {
  id: number;
  name: string;
  image: string;
  specie: string;
  like: boolean;
  isSelected?: boolean;
  className?: string;
}

const PersonCard: FC<PersonCardProps> = ({
  id,
  name,
  image,
  specie,
  like,
  isSelected,
  className,
}) => {
  const [liked, setLiked] = useState(like);
  const [toggleLike] = useMutation(TOGGLE_LIKE);

  const handleLikeToggle = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    event.preventDefault();
    try {
      const { data } = await toggleLike({ variables: { id } });
      setLiked(data.ToggleLike.like);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <div
      className={`flex py-4 px-5 items-center justify-between border-t rounded-lg cursor-pointer border-secondaryGrey ${
        isSelected && "bg-primaryHover"
      }  ${className || ""}`}
    >
      <div className="flex justify-center items-center gap-4">
        <img src={image} alt={name} className="h-8 w-8 rounded-full" />
        <div>
          <h3 className="font-bold">{name}</h3>
          <h3 className="text-primaryGrey">{specie}</h3>
        </div>
      </div>
      <ButtonLike like={liked} onClick={handleLikeToggle} />
    </div>
  );
};

export default PersonCard;
