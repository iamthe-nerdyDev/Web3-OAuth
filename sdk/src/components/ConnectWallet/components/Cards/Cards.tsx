import React, { useState } from "react";
import { ICardsComponent } from "./Cards.types";
import { createSession } from "../utils/helper";
import { Close, Loader, Logo } from "../utils/icons";

const Cards: React.FC<ICardsComponent> = (props) => {
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const doCreateSession = async () => {
    if (isLoading) return;

    if (!selectedCardId) {
      alert("Select a card first");
      return;
    }

    setIsLoading(true);

    const _reponse = await createSession(
      selectedCardId,
      props.data.accessToken!,
      props.data.user!,
      props.data.message!,
      props.data.signature!
    );

    if (!_reponse) alert("ERR: Unable to complete request!");
    else localStorage.setItem("web3_oauth_session_token", _reponse);

    props.setShouldDisplayCards(false);
    setIsLoading(false);
  };

  const handleOverlayClick = (e: any) => {
    if (e.target.classList.contains("web3-oauth__modal")) {
      props.setShouldDisplayCards(false);
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`web3-oauth web3-oauth__darks web3-oauth__modal ${
        props.shouldDisplayCards ? "web3-oauth__show" : "web3-oauth__hide"
      }`}
      onClick={handleOverlayClick}
    >
      <div className="web3-oauth__modal-box">
        <div>
          <div className="web3-oauth__modal-header">
            <div className="web3-oauth__modal-header__title">
              <Logo />
              <p> Web3 OAuth</p>
            </div>
            <div
              className="web3-oauth__modal-close"
              onClick={() => props.setShouldDisplayCards(false)}
            >
              <Close />
            </div>
          </div>
          <div className="web3-oauth__intro-text">
            <h3>Pick your Card</h3>
          </div>
          <div className="web3-oauth__cards-list">
            {props.cards && props.cards.length > 0
              ? props.cards.map((card, i) => (
                  <div
                    onClick={() => setSelectedCardId(Number(card.id))}
                    className={`web3-oauth__single-card ${
                      selectedCardId && selectedCardId == card.id
                        ? "selected"
                        : ""
                    }`}
                    key={`user-card-list-${i}`}
                  >
                    <img src={card.pfp} alt="User" />
                    <div>
                      <h4>{card.username}</h4>
                      <p>{card.bio}</p>
                    </div>
                  </div>
                ))
              : "Nothing found"}
          </div>
          <button
            className="wallet-list__button"
            disabled={!selectedCardId ? true : isLoading}
            onClick={doCreateSession}
          >
            {isLoading ? <Loader /> : "Use card"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
