import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Paper,
  Typography,
} from "@mui/material";
import { Box, minHeight } from "@mui/system";
import { request } from "https";
import { useState } from "react";
import { CardSelector } from "../components/CardSelector";
import { cards, PlayingCard } from "../types/PlayingCard";

interface requestJson {
  player_cards: number[];
  dealer_card: number;
  nrDecks: number;
  isSoft: string;
  isDAS: string;
}

const getCardValue = (card: PlayingCard) => {
  switch (card.value) {
    case "Ace":
      return 11;
    case "Two":
      return 2;
    case "Three":
      return 3;
    case "Four":
      return 4;
    case "Five":
      return 5;
    case "Six":
      return 6;
    case "Seven":
      return 7;
    case "Eight":
      return 8;
    case "Nine":
      return 9;
    case "Ten":
    case "Jack":
    case "Queen":
    case "King":
      return 10;
    default:
      return -1;
  }
};

const createJsonRequest = (
  nrDecks: number,
  isSoft: boolean,
  isDAS: boolean,
  dealerCard: PlayingCard,
  playerCards: PlayingCard[]
) => {
  let playerCardValue1, playerCardValue2, dealerCardValue: number;

  if (playerCards.length < 1) {
    alert("No player cards have been selected");
    return;
  } else if (playerCards.length < 2) {
    if (nrDecks > 1) {
      playerCardValue1 = getCardValue(playerCards[0]);
      playerCardValue2 = playerCardValue1;
    } else {
      alert("Only one player card has been selected");
      return;
    }
  } else {
    playerCardValue1 = getCardValue(playerCards[0]);
    playerCardValue2 = getCardValue(playerCards[1]);
  }
  dealerCardValue = getCardValue(dealerCard);

  const softValue: string = String(isSoft);
  const dasValue: string = String(isDAS);

  let request = {} as requestJson;
  request.player_cards = [playerCardValue1, playerCardValue2];
  request.dealer_card = dealerCardValue;
  request.nrDecks = nrDecks;
  request.isSoft = softValue;
  request.isDAS = dasValue;

  return JSON.stringify(request);
};

export const Overview = () => {
  const [serverResponse, setServerResponse] = useState<string>("");
  const handleSubmit = () => {
    fetch("request URL und so")
      .then((response) => response.json())
      .then((text) => setServerResponse(text));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "lightgrey",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
        }}
      >
        <Typography variant="h2" sx={{ width: "100%", textAlign: "center" }}>
          Blackjack Assistant
        </Typography>
        <Paper>
          <h3>Test Form</h3>
          <FormControlLabel
            control={<Checkbox name="softCheckbox" />}
            label="is Soft"
          />
          <FormControlLabel
            control={<Checkbox name="dasCheckbox" />}
            label="is DAS"
          />
          <Button onClick={handleSubmit}>Submit</Button>
          <h4>Dealer Card (select one)</h4>
          <CardSelector
            cards={cards}
            onSelectionChange={(selection) => console.log(selection)}
            maxSelection={1}
          />
          <h4>Your Cards (select two)</h4>
          <CardSelector
            cards={cards}
            onSelectionChange={(selection) => console.log(selection)}
            maxSelection={2}
          />
        </Paper>
      </Container>
    </Box>
  );
};
