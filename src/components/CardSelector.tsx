import { Checkbox, FormControlLabel } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { PlayingCard } from "../types/PlayingCard";
import update from "immutability-helper";

type CardSelectorProps = {
  cards: PlayingCard[];
  onSelectionChange: (selection: PlayingCard[]) => void;
  maxSelection: number;
};

export const CardSelector: FunctionComponent<CardSelectorProps> = ({
  cards,
  onSelectionChange,
  maxSelection,
}) => {
  const [internalCards, setInternalCards] = useState(cards);

  return (
    <div>
      {internalCards.map((card, i) => (
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
                  alert(`Du darfst nur ${maxSelection} Karte(n) auswählen`);
                } else {
                  const newSelection = update(internalCards, {
                    [i]: {
                      checked: {
                        $apply: function (x) {
                          return !x;
                        },
                      },
                    },
                  });
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
