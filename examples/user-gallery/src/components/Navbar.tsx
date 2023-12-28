import React from "react";
import { ConnectBtn } from ".";
import { RiMenu4Line } from "react-icons/ri";

type Props = {
  setDisplaySidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navbar = ({ setDisplaySidebar }: Props) => {
  return (
    <nav className="navbar w-100 py-3">
      <div className="w-100">
        <div className="d-flex px-4 align-items-center justify-content-between justify-content-md-end w-100">
          <div
            className="menu d-flex d-md-none"
            onClick={() => setDisplaySidebar(true)}
          >
            <RiMenu4Line />
          </div>

          <ConnectBtn />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
