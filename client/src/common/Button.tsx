import { ComponentPropsWithoutRef, FC } from "react";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  children: string;
  loading?: boolean;
  isSelected?: boolean;
  className?: string;
}

const Button: FC<ButtonProps> = ({
  children,
  loading,
  isSelected,
  disabled,
  type,
  className,
  ...ButtonProps
}) => {
  return (
    <button
      type={type || "submit"}
      disabled={disabled || loading}
      className={`flex-1 border border-secondaryGrey rounded-lg py-2 px-2 font-medium text-sm ${
        isSelected && "bg-primaryHover text-primaryButton"
      } ${className || ""}`}
      {...ButtonProps}
    >
      {children}
    </button>
  );
};

export default Button;
