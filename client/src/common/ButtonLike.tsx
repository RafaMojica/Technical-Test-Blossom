import { ComponentPropsWithoutRef, FC } from "react";

interface ButtonLikeProps extends ComponentPropsWithoutRef<"button"> {
  like: boolean;
  onClick: () => void;
  className?: string;
}

const ButtonLike: FC<ButtonLikeProps> = ({ like, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl p-1 bg-white ${className || ""}`}
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
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4.318 6.318a4.5 4.5 0 0 0 0 6.364L12 20.364l7.682-7.682a4.5 4.5 0 0 0-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 0 0-6.364 0Z"
        />
      </svg>
    </button>
  );
};

export default ButtonLike;
