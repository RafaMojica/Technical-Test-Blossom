import { ComponentPropsWithoutRef, FC } from "react";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  children: string;
  loading?: boolean;
  className?: string;
}

const Button: FC<ButtonProps> = ({
  children,
  loading,
  disabled,
  type,
  className,
  ...ButtonProps
}) => {
  return (
    <button
      type={type || "submit"}
      disabled={disabled || loading}
      className={`flex-1 border border-secondaryGrey hover:bg-primaryHover rounded-lg py-2 px-2 font-medium text-sm ${
        className || ""
      }`}
      {...ButtonProps}
    >
      {children}
    </button>
  );
};

export default Button;
