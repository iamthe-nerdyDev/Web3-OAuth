import { Link } from "react-router-dom";

const AnchorLink = ({
  to,
  children,
}: {
  to: string;
  children?: React.ReactNode;
}) => {
  return <Link to={to}>{children}</Link>;
};

export default AnchorLink;
