import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
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
  playerCards: PlayingCard[],
  dealerCard?: PlayingCard
) => {
  let playerCardValue1, playerCardValue2, dealerCardValue: number;
  if (!dealerCard) {
    alert("No dealer card has been selected");
    return;
  }

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
  const [isCheckedSoft, setCheckedSoft] = useState(false);
  const [isCheckedDAS, setCheckedDAS] = useState(false);
  const [deckNumber, setDeckNumber] = useState<number>();
  const [playerCards, setPlayerCards] = useState<PlayingCard[]>();
  const [dealerCards, setDealerCards] = useState<PlayingCard[]>();

  const handleChangeSoft = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedSoft(e.target.checked);
  };
  const handleChangeDAS = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedDAS(e.target.checked);
  };

  const handleChangeDecks = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeckNumber(+e.target.value);
  };

  const handleSubmit = () => {
    if (deckNumber === undefined) {
      return;
    }
    if (dealerCards !== undefined && playerCards !== undefined) {
      const requestBody: string = createJsonRequest(
        deckNumber,
        isCheckedSoft,
        isCheckedDAS,
        playerCards.filter((card) => card.checked),
        dealerCards.find((card) => card.checked)
      )!;

      fetch("URL hier", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      })
        .then((response) => response.json())
        .then((text) => setServerResponse(text));
    }
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
          <h3>Enter the specific rules</h3>
          <FormControlLabel
            control={
              <Checkbox
                name="softCheckbox"
                onChange={handleChangeSoft}
                checked={isCheckedSoft}
              />
            }
            label="is Soft"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="dasCheckbox"
                onChange={handleChangeDAS}
                checked={isCheckedDAS}
              />
            }
            label="is DAS"
          />
          <TextField
            id="nrDecksField"
            label="Number of Decks used"
            variant="outlined"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            onChange={handleChangeDecks}
          />
          <Button onClick={handleSubmit}>Submit</Button>
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            {serverResponse}
          </Box>
          <h4>Dealer Card (select one)</h4>
          <CardSelector
            cards={cards}
            onSelectionChange={setDealerCards}
            maxSelection={1}
          />
          <h4>Your Cards (select two)</h4>
          <CardSelector
            cards={cards}
            onSelectionChange={setPlayerCards}
            maxSelection={2}
          />
        </Paper>
      </Container>
    </Box>
  );
};
