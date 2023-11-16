import { Dispatch, SetStateAction } from "react";

export interface ICardsData {
  user: string | null;
  accessToken: string | null;
  message: string | null;
  signature: string | null;
}

export interface ICardsComponent {
  cards: any[];
  data: ICardsData;
  shouldDisplayCards: boolean;
  setShouldDisplayCards: Dispatch<SetStateAction<boolean>>;
}
