import { useContext } from "react";
import StateContext from "@/utils/context/StateContext";

import "./Features.css";

const Features = () => {
  const { theme } = useContext(StateContext)!;

  const FeaturesList = [
    {
      title: "Streamlined Profile Creation",
      body: "Allow users to create and manage multiple profile card details for different scenarios.",
      image: "/images/features/one.png",
    },
    {
      title: "Real-Time Website Updates",
      body: "Users info gets changed in real time across all affected websites instantly",
      image: "/images/features/two.png",
    },
    {
      title: "Effortless Profile Picture Management",
      body: "Your NFT can be easily selected as your PFP or from you device",
      image: "/images/features/three.png",
    },
    {
      title: "Secure and Privacy-Conscious Data Sharing",
      body: "Ensure safe and private data sharing with user consent.",
      image: "/images/features/four.png",
    },
  ];

  return (
    <section className={`features py-5 ${theme} mb-3`} id="features">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="px-2">
              <div className="row g-4">
                <div className="col-12 mb-3">
                  <h2 className="text-center gradient-text">What We Offer</h2>
                </div>
                <div className="col-12">
                  <div className="row g-5">
                    {FeaturesList.map((feature, i) => (
                      <div className="col-12 col-md-6" key={`feature-${i}`}>
                        <div className="single-feature">
                          <div className="text-center text">
                            <h4>{feature.title}</h4>
                            <p>{feature.body}</p>
                          </div>
                          <div className="image">
                            <img src={feature.image} alt="Feature image" />
                          </div>
                        </div>
                      </div>
                    ))}
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

export default Features;
