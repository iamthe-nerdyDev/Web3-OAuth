import { useContext } from "react";
import StateContext from "@/utils/context/StateContext";

import "./Bonus.css";
import { Star } from "@/icons";

const Bonus = () => {
  const { theme } = useContext(StateContext)!;

  return (
    <section className={`bonus py-5 ${theme} mb-4`}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="px-3">
              <div className="row g-4">
                <div className="col-12 text-center">
                  <h2 className="gradient-text">Bonus Concept</h2>
                </div>
                <div className="col-12 col-md-9 col-lg-7 mx-auto text-center">
                  <p>
                    Developers can integrate our SDK into their websites, which
                    activates a modal for a smooth user experience. The SDK file
                    streamlines library integration for developers.
                  </p>
                </div>
                <div className="col-12 col-md-9 col-lg-7 mx-auto">
                  <div className="rating d-flex align-items-center justify-content-center gap-1">
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bonus;
