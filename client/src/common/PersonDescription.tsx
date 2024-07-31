import { FC } from "react";

interface PersonDescriptionProps {
  title: string;
  description: string;
  className?: string;
}

const PersonDescription: FC<PersonDescriptionProps> = ({
  title,
  description,
  className,
}) => {
  return (
    <div className={`py-4 ${className || ""}`}>
      <h3 className="font-bold">{title}</h3>
      <p className="text-primaryGrey">{description}</p>
    </div>
  );
};

export default PersonDescription;
