import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Paper,
  Typography,
} from "@mui/material";
import { Box, minHeight } from "@mui/system";
import { useState } from "react";
import { CardSelector } from "../components/CardSelector";
import { cards } from "../types/PlayingCard";

export const Overview = () => {
  const [serverResponse, setServerResponse] = useState<string>("");
  const handleSubmit = () => {
    fetch("request")
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
            control={<Checkbox name="rule1Checkbox" />}
            label="Rule 1"
          />
          <FormControlLabel
            control={<Checkbox name="rule2Checkbox" />}
            label="Rule 2"
          />
          <FormControlLabel
            control={<Checkbox name="rule3Checkbox" />}
            label="Rule 3"
          />
          <Button onClick={handleSubmit}>Submit</Button>
          <h4>Dealer Card (select one)</h4>
          <CardSelector
            cards={cards}
            onSelectionChange={(selection) => console.log(selection)}
            maxSelection={1}
          />
        </Paper>
      </Container>
    </Box>
  );
};
