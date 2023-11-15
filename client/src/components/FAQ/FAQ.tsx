import { useContext, useState } from "react";
import StateContext from "@/utils/context/StateContext";
import { ChevronDown, ChevronUp } from "@/icons";

import "./FAQ.css";

const FAQ = () => {
  const { theme } = useContext(StateContext)!;

  const [currentIndex, setCurrentIndex] = useState<number>(1);

  const FAQList = [
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
  ];

  return (
    <section className={`faq py-5 mb-5 ${theme}`}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="px-2">
              <div className="row g-4">
                <div className="col-12 col-md-9 col-lg-7 mx-auto mb-1">
                  <h2 className="gradient-text text-center">
                    Find Answers to Your Burning Questions about Web3 OAuth
                  </h2>
                </div>
                <div className="col-12 col-md-9 col-lg-7 mx-auto">
                  <div className="row">
                    {FAQList.map((faq, i) => (
                      <div className="col-12" key={`faq-list-${i}`}>
                        <div
                          className={`single-faq d-flex gap-2 justify-content-between ${
                            FAQList.length === i + 1 && "border-none"
                          }`}
                        >
                          <div>
                            <h4>{faq.question}</h4>
                            <p
                              className={
                                currentIndex === i + 1 ? "d-block" : "d-none"
                              }
                            >
                              {faq.answer}
                            </p>
                          </div>
                          <div
                            className="pointer"
                            onClick={() =>
                              setCurrentIndex(
                                currentIndex === i + 1 ? 0 : i + 1
                              )
                            }
                          >
                            {currentIndex === i + 1 ? (
                              <ChevronUp />
                            ) : (
                              <ChevronDown />
                            )}
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

export default FAQ;
