import React, { useState } from "react";
import { Navbar, Sidebar } from ".";
import { GoX } from "react-icons/go";

type Props = {
  children?: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const [displaySidebar, setDisplaySidebar] = useState<boolean>(false);

  return (
    <main>
      <section className="d-none d-md-block">
        <div className="d-flex desktop-box">
          <div>
            <Sidebar />
          </div>
          <div>
            <Navbar setDisplaySidebar={setDisplaySidebar} />
            <div>{children}</div>
          </div>
        </div>
      </section>

      <section className="d-block d-md-none">
        <div className={`overlay ${displaySidebar ? "d-block" : "d-none"}`}>
          <div className="close" onClick={() => setDisplaySidebar(false)}>
            <GoX />
          </div>
        </div>

        <div
          className={`mobile-sidebar ${displaySidebar ? "d-block" : "d-none"}`}
        >
          <Sidebar />
        </div>

        <div>
          <Navbar setDisplaySidebar={setDisplaySidebar} />
          <div>{children}</div>
        </div>
      </section>
    </main>
  );
};

export default Layout;
