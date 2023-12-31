import React from "react";

type CardProps = {
  displayModal: boolean;
  setDisplayModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const CardSelector: React.FC<CardProps> = (props) => {
  return <div>CardSelector</div>;
};

export default CardSelector;
