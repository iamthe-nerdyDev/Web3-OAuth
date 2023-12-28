import { AnchorLink } from ".";

const NotFound = () => {
  return (
    <div>
      404 - NotFound
      <br />
      <AnchorLink to="/">
        <button className="btn btn-success">Back home</button>
      </AnchorLink>
    </div>
  );
};

export default NotFound;
