import React from "react";
import { ICardsProps } from "../Connect.types";
import { defaultUserImage } from "../../../dist";

const Cards: React.FC<ICardsProps> = () => {
  return (
    <div className="web3-oauth__card-container">
      <div className="web3-oauth__card-box">
        <h1>Pick a card</h1>
        <div className="cards-list">
          <div className="cards-single">
            <img src={defaultUserImage} alt="use" />
            <div>
              <h4>NerdyDev</h4>
              <p>user@example.com</p>
              <p>I am him...dfkm!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
