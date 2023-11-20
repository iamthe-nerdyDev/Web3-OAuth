import React, { useState } from "react";
import { ICardsProps } from "../Connect.types";
import { defaultUserImage, spinnerWhite } from "../../../assets";
import { createSession } from "../../../functions";
import { useAddress } from "@thirdweb-dev/react";
import {
  ButtonImageStyle,
  CardBox,
  CardBoxButtonDiv,
  CardBoxButtonDivBtn1,
  CardBoxButtonDivBtn2,
  CardBoxButtonDivBtn2Dark,
  CardBoxDark,
  CardBoxIntro,
  CardBoxIntroP,
  CardContainer,
  CardList,
  CardListDark,
  ClearMarginAndPadding,
  DisabledButton,
  DisplayFlex,
  DisplayNone,
  SingleCard,
  SingleCardDark,
  SingleCardDiv,
  SingleCardDiv2,
  SingleCardDivP,
  SingleCardImg,
  SingleCardSelected,
} from "./Styles";

const Cards: React.FC<ICardsProps> = (props) => {
  const address = useAddress();

  const [selectedCardId, setSelectedCardId] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOverlayClick = (e: any) => {
    if (e.target.classList.contains("web3_oauth")) {
      props.setDisplayCardModal(false);
    }
  };

  const doCreateSession = async (): Promise<void> => {
    if (!address) return;

    setIsLoading(true);

    const _response = await createSession(
      selectedCardId,
      props.accessToken,
      address,
      props.message,
      props.signature
    );

    if (!_response) alert("Oops! unable to complete request");
    else {
      props.setNewToken(_response);
      props.setDisplayCardModal(false);
    }

    setIsLoading(false);

    return;
  };

  return (
    props.cards && (
      <div
        style={
          props.displayCardModal
            ? ({ ...DisplayFlex, ...CardContainer } as React.CSSProperties)
            : (DisplayNone as React.CSSProperties)
        }
        className="web3_oauth"
        onClick={handleOverlayClick}
      >
        <div
          style={
            props.theme === "light"
              ? (CardBox as React.CSSProperties)
              : ({ ...CardBox, ...CardBoxDark } as React.CSSProperties)
          }
        >
          <div style={CardBoxIntro as React.CSSProperties}>
            <h1 style={ClearMarginAndPadding as React.CSSProperties}>
              Import Card
            </h1>
            <p
              style={
                {
                  ...ClearMarginAndPadding,
                  ...CardBoxIntroP,
                } as React.CSSProperties
              }
            >
              Choose a card from your existing cards
            </p>
          </div>
          <div
            style={
              props.theme
                ? (CardList as React.CSSProperties)
                : ({ ...CardList, ...CardListDark } as React.CSSProperties)
            }
          >
            {props.cards.map((card, i) => (
              <div
                onClick={() => setSelectedCardId(card.id)}
                key={`card-listing-${i}`}
                style={
                  props.theme === "light"
                    ? card.id == selectedCardId
                      ? ({
                          ...SingleCard,
                          ...SingleCardSelected,
                        } as React.CSSProperties)
                      : (SingleCard as React.CSSProperties)
                    : card.id == selectedCardId
                    ? ({
                        ...SingleCard,
                        ...SingleCardDark,
                        ...SingleCardSelected,
                      } as React.CSSProperties)
                    : ({
                        ...SingleCard,
                        ...SingleCardDark,
                      } as React.CSSProperties)
                }
              >
                <div style={SingleCardDiv as React.CSSProperties}>
                  <img
                    src={defaultUserImage}
                    style={SingleCardImg as React.CSSProperties}
                    alt="use"
                  />
                </div>
                <div style={SingleCardDiv2 as React.CSSProperties}>
                  <h4 style={ClearMarginAndPadding as React.CSSProperties}>
                    {card.username}
                  </h4>
                  <p
                    style={
                      {
                        ...ClearMarginAndPadding,
                        ...SingleCardDivP,
                      } as React.CSSProperties
                    }
                  >
                    {card.emailAddress}
                  </p>
                  <p
                    style={
                      {
                        ...ClearMarginAndPadding,
                        ...SingleCardDivP,
                      } as React.CSSProperties
                    }
                  >
                    {card.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div style={CardBoxButtonDiv as React.CSSProperties}>
            <button
              style={
                selectedCardId === 0 || isLoading
                  ? ({
                      ...DisabledButton,
                      ...CardBoxButtonDivBtn1,
                    } as React.CSSProperties)
                  : (CardBoxButtonDivBtn1 as React.CSSProperties)
              }
              onClick={doCreateSession}
              disabled={selectedCardId === 0 ? true : isLoading}
            >
              {isLoading ? (
                <img
                  style={ButtonImageStyle as React.CSSProperties}
                  src={spinnerWhite}
                  alt="loading white"
                />
              ) : (
                "Import Card"
              )}
            </button>
            <button
              style={
                props.theme === "light"
                  ? (CardBoxButtonDivBtn2 as React.CSSProperties)
                  : ({
                      ...CardBoxButtonDivBtn2,
                      ...CardBoxButtonDivBtn2Dark,
                    } as React.CSSProperties)
              }
              onClick={() => props.setDisplayCardModal(false)}
            >
              Not interested
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default Cards;
