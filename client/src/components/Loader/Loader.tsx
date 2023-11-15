import { Themes } from "@/interface";
import "./Loader.css";

const Loader = ({ theme }: { theme: Themes }) => {
  return (
    <div className={`loading-screen ${theme}`}>
      <h2>Web3 OAuth</h2>
      <div className="loader-box mb-2">
        <div></div>
      </div>
      <p>Loading..</p>
    </div>
  );
};

export default Loader;
