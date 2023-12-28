import { Link } from "react-router-dom";

type Props = {
  to: string;
  children?: React.ReactNode;
  className?: string;
};

const AnchorLink = ({ to, children, className }: Props) => {
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
};

export default AnchorLink;
