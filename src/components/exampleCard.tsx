import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { CardHeader, TextField, CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { GetTippAction, LoadTippAction } from "../actions/blackjackActions";
import { IAppState } from "../Store/store";

const useStyles = makeStyles({
  root: {
    width: 275,
    height: 275,
    alignSelf: "middle",
    justifySelf: "start",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "2vh",
  },
  button: {
    marginTop: "10px",
    height: "7vh",
    width: "90%",
  },
  input: {
    width: "90%",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [testMessage, setTestMessage] = useState("");
  const isLoading = useSelector(
    (state: IAppState) => state.blackjackState.loading
  );

  const getTipp = () => {
    dispatch(LoadTippAction(true));
    dispatch(GetTippAction(1, 2, 3));
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        title={
          <Typography variant="h5" component="h2">
            Blackjack Assistant
          </Typography>
        }
      ></CardHeader>
      <CardContent className={classes.content}>
        <TextField
          onChange={(e) => setTestMessage(e.target.value)}
          className={classes.input}
          label="Type a test value..."
          variant="outlined"
        ></TextField>
        <Button
          onClick={() => getTipp()}
          className={classes.button}
          variant="contained"
          size="large"
          color="primary"
        >
          {isLoading ? (
            <CircularProgress color="secondary"></CircularProgress>
          ) : (
            <Typography>get {testMessage} test</Typography>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
