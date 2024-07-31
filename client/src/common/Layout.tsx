import { FC } from "react";

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
  className?: string;
}

const Layout: FC<LayoutProps> = ({ children, className }) => {
  return <div className={`p-8 flex ${className || ""}`}>{children}</div>;
};

export default Layout;
