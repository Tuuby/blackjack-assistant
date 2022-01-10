import { Checkbox, FormControlLabel } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { PlayingCard } from "../types/PlayingCard";

type CardSelectorProps = {
  cards: PlayingCard[];
  onSelectionChange: (selection: PlayingCard[]) => void;
  maxSelection: number;
};

const toggleAtIndex = (array: PlayingCard[], index: number) => {
  const output = [...array];
  output[index].checked = !array[index].checked;
  return output;
};

export const CardSelector: FunctionComponent<CardSelectorProps> = ({
  cards,
  onSelectionChange,
  maxSelection,
}) => {
  const [internalCards, setInternalCards] = useState(cards);

  return (
    <div>
      {cards.map((card, i) => (
        <FormControlLabel
          key={card.id}
          control={
            <Checkbox
              checked={card.checked}
              onChange={() => {
                const selectionCount = internalCards.filter(
                  (card) => card.checked
                ).length;
                if (selectionCount >= maxSelection && !card.checked) {
                  alert("Du darfst nur eine Karte auswählen");
                } else {
                  const newSelection = toggleAtIndex(internalCards, i);
                  setInternalCards(newSelection);
                  onSelectionChange(newSelection);
                }
              }}
            />
          }
          label={`${card.value} of ${card.colorIcon}`}
        />
      ))}
    </div>
  );
};
