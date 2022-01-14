export type PlayingCard = {
  id: number;
  color: string;
  colorIcon: string;
  value: string;
  checked: boolean;
  imgSRC?: string;
};

const colors = ["spades", "hearts", "clubs", "diamonds"];
const colorIcons = ["♠", "♥", "♣", "♦"];
const values = [
  "Ace",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Jack",
  "Queen",
  "King",
];

export const cards: PlayingCard[] = colors.flatMap((color, colorIndex) =>
  values.map((value, valueIndex) => ({
    color: color,
    colorIcon: colorIcons[colorIndex],
    value: value,
    checked: false,
    id: valueIndex * 10 + colorIndex,
  }))
);
