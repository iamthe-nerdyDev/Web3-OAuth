import { GoRepo, GoVerified } from "react-icons/go";
import { AnchorLink } from ".";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="head px-3 py-5">
        <AnchorLink to="/" className="mb-4 d-inline-block">
          <div className="logo">
            <GoRepo />
          </div>
        </AnchorLink>

        <div className="intro">
          <h2>Directory</h2>
          <p>
            View directory of <span>2.3k</span> Web3 OAuth users
          </p>
        </div>
      </div>

      <div className="body">
        <div className="header mb-2">0</div>
        <ul>
          <li className="list">
            <img src="https://iili.io/JRXtHcF.png" alt="xx" />
            <div>
              <p>
                @0xFirst <GoVerified />
              </p>
              <span>oxfirst@gmail.com</span>
            </div>
          </li>
        </ul>

        <div className="header mb-2">N</div>
        <ul>
          <li className="list">
            <img src="https://iili.io/JRXtHcF.png" alt="xx" />
            <div>
              <p>
                @NerdyDev <GoVerified />
              </p>
              <span>momoreoluwaadedeji@gmail.com</span>
            </div>
          </li>
          <li className="list">
            <img src="https://iili.io/JRXtHcF.png" alt="xx" />
            <div>
              <p>
                @NerdyDev <GoVerified />
              </p>
              <span>momoreoluwaadedeji@gmail.com</span>
            </div>
          </li>
          <li className="list">
            <img src="https://iili.io/JRXtHcF.png" alt="xx" />
            <div>
              <p>
                @NerdyDev <GoVerified />
              </p>
              <span>momoreoluwaadedeji@gmail.com</span>
            </div>
          </li>
          <li className="list">
            <img src="https://iili.io/JRXtHcF.png" alt="xx" />
            <div>
              <p>
                @NerdyDev <GoVerified />
              </p>
              <span>momoreoluwaadedeji@gmail.com</span>
            </div>
          </li>
          <li className="list">
            <img src="https://iili.io/JRXtHcF.png" alt="xx" />
            <div>
              <p>
                @NerdyDev <GoVerified />
              </p>
              <span>momoreoluwaadedeji@gmail.com</span>
            </div>
          </li>
          <li className="list">
            <img src="https://iili.io/JRXtHcF.png" alt="xx" />
            <div>
              <p>
                @NerdyDev <GoVerified />
              </p>
              <span>momoreoluwaadedeji@gmail.com</span>
            </div>
          </li>
          <li className="list">
            <img src="https://iili.io/JRXtHcF.png" alt="xx" />
            <div>
              <p>
                @MyNerdyDev <GoVerified />
              </p>
              <span>momoreoluwaadedeji@gmail.com</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
