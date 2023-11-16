import "./Preview.css";

import userImage from "@/assets/user.png";
import userImage2 from "@/assets/user-2.png";
import { useContext } from "react";
import StateContext from "@/utils/context/StateContext";

const Preview = () => {
  const { theme } = useContext(StateContext)!;

  return (
    <section className={`preview pt-5 my-5 ${theme}`}>
      <div className="container mt-5">
        <div className="row">
          <div className="col-12">
            <div className="preview-main d-flex alignn-items-center justify-content-center">
              <div className="single-card d-flex align-items-center one">
                <img src={userImage} alt="User" />
                <div className="d-flex flex-column">
                  <h4 className="username">NerdyDev</h4>
                  <p className="email">adedejimorife@gmail.com</p>
                  <p className="bio">I am the one</p>
                </div>
              </div>
              <div className="single-card d-flex align-items-center two">
                <img src={userImage2} alt="User" />
                <div className="d-flex flex-column">
                  <h4 className="username">moyinthegrait</h4>
                  <p className="email">moyinadedeji@gmail.com</p>
                  <p className="bio">A product designer</p>
                </div>
              </div>
              <div>
                <img src="/images/phone.png" alt="Half Phone" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Preview;
