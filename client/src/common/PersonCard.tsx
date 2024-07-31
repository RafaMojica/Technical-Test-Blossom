import { FC, useState } from "react";

interface PersonCardProps {
  name: string;
  image: string;
  specie: string;
}

const PersonCard: FC<PersonCardProps> = ({ name, image, specie }) => {
  const [like, setLike] = useState(false);

  return (
    <div className="group flex gap-4 py-4 px-5 items-center justify-center border-y rounded-lg cursor-pointer border-secondaryGrey focus:bg-primaryHover">
      <img src={image} alt={name} />
      <div>
        <h3 className="font-bold">{name}</h3>
        <h3 className="text-primaryGray">{specie}</h3>
      </div>
      <button
        onClick={() => setLike(!like)}
        className="rounded-2xl p-1 group-focus:bg-white"
      >
        {like ? (
          <img src="../public/icons/Heart.svg" alt="heart" />
        ) : (
          <img src="../public/icons/Heart-Gray.svg" alt="heart" />
        )}
      </button>
    </div>
  );
};

export default PersonCard;
