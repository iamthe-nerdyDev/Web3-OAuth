import { useContext, useState } from "react";
import StateContext from "@/utils/context/StateContext";
import { ChevronDown, ChevronUp } from "@/icons";

import "./FAQ.css";

const FAQ = () => {
  const { theme } = useContext(StateContext)!;

  const [currentIndex, setCurrentIndex] = useState<number>(1);

  const FAQList = [
    {
      question: "Can I create more than one profile card?",
      answer:
        "Absolutely! You can create as many cards as possible. It won't be nice if there are some kind of restrictions attached right?",
    },
    {
      question: "Can I connect more than one website to a card?",
      answer:
        "Yes. This also promotes - make changes on dashboard, reflect everywhere. So, that way you don't have changing info for each website",
    },
    {
      question: "Which EVM is powering Web3 OAuth",
      answer: "Currently, Web3 OAuth is running on the Telos EVM Testnet",
    },
    {
      question: "Can NFTs be used as PFP when creating cards?",
      answer:
        "100% possible. We tried to make it as easy as possible. You can always select your favourite NFT as a PFP",
    },
  ];

  return (
    <section className={`faq py-5 mb-5 ${theme}`} id="faq">
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
                <div className="col-12 col-md-9 col-lg-8 mx-auto">
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
