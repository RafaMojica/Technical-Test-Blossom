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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
        >
          <path
            fill={`${like ? "#53C629" : "none"} `}
            stroke={`${like ? "#53C629" : "#D1D5DB"} `}
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4.318 6.318a4.5 4.5 0 0 0 0 6.364L12 20.364l7.682-7.682a4.5 4.5 0 0 0-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 0 0-6.364 0Z"
          />
        </svg>
      </button>
    </div>
  );
};

export default PersonCard;
